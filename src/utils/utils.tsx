function convertJSONValues(template: string, data: any) {
    // const TABLE_ROWS = createTableRows(template, data.items);
    const [TABLE_ROWS, HEIGHT] = createPDFmakeTableRows(template, data.items);
    const [AMOUNT, TAX, TOTAL] = handleTotals(data.items);
    template = template.replace('\n', "");
    template = template.replace('${LOGO}', (data.logo || ""));// Need to add logo to state
    template = template.replace('${DATE}', (data.date || ""));
    template = template.replace('${TO_NAME}', (data.to_name || ""));
    template = template.replace('${TO_PHONE}', (data.to_phone || ""));
    template = template.replace('${TO_EMAIL}', (data.to_email || ""));
    template = template.replace('${FROM_NAME}', (data.from_name || ""));
    template = template.replace('${FROM_PHONE}', (data.from_email || ""));
    template = template.replace('${FROM_EMAIL}', (data.from_email || ""));
    template = template.replace('${TO_ADDRESS}', (data.to_address || ""));
    template = template.replace('${FROM_ADDRESS}', (data.from_address || ""));
    template = template.replace('{"CUSTOM_FIELD":"${TABLE_ROWS}"},', TABLE_ROWS || "");
    template = template.replace('${AMOUNT}', (AMOUNT).toString());
    template = template.replace('${TOTAL_TAX}', (TAX).toString());
    template = template.replace('${TOTAL}', (TOTAL).toString());
    template = template.replace('${NOTES}', (data.form_notes || ""));
    template = template.replace('${ADD_ROW_HEIGHTS}', (HEIGHT || ""));
    return template;
}

function validateMath(values: any, name: string) {
    values = { ...values, qty: values.qty && parseFloat(values.qty) > 0 ? parseFloat(values.qty) : 1, unitprice: parseFloat(values.unitprice) || null, tax: parseFloat(values.tax) || null, amount: parseFloat(values.amount) || null };
    switch (name) {
        case "qty": updateAmount(values);
            break;
        case "unitprice": updateAmount(values);
            break;
        case "tax": updateAmount(values);
            break;
        case "amount": updateUnitPrice(values);
            break;
    }
    return values;
}

function updateAmount(values: any) {
    const qty = values.qty || 1;
    // (qty * unitprice)  + ((qty * unitprice) * (tax/100))
    values.amount = ((qty * values.unitprice) + ((qty * values.unitprice) * (values.tax / 100))).toFixed(2);
}

function updateUnitPrice(values: any) {
    const qty = values.qty || 1;
    // (amount/qty) /(1+tax)
    values.unitprice = ((values.amount / qty) / (1 + (values.tax / 100))).toFixed(2);
}


function handleTotals(items: any) {
    let TOTAL = 0;
    let AMOUNT = 0;
    let TAX = 0;
    items.forEach((o: any) => {
        const values = { qty: parseFloat(o.qty) || 1, unitprice: parseFloat(o.unitprice) || 0, tax: parseFloat(o.tax) || 0, amount: parseFloat(o.amount) || 0 };
        AMOUNT += parseFloat(((values.qty * values.unitprice)).toFixed(2));
        TAX += parseFloat((((values.qty * values.unitprice) * (values.tax / 100))).toFixed(2));
        TOTAL += parseFloat((values.amount).toFixed(2));
    });
    return [parseFloat(AMOUNT.toFixed(2)), parseFloat(TAX.toFixed(2)), parseFloat(TOTAL.toFixed(2))];
}

//! For HTML to PDFmake
function createTableRows(template: string, items: any) {
    const ROWS = [''];
    let TOTAL_ROWS = '';
    items.forEach((o: any) => {
        ROWS.push("<tr>");
        const qty = `<td>${o.qty || "1"}</td>`;
        const item = `<td>${o.item || ""}</td>`;
        const unitprice = `<td>${o.unitprice || "0"}</td>`;
        const tax = `<td>${o.tax || "0"}</td>`;
        const amount = `<td>${o.amount || "0"}</td>`;
        ROWS.push(qty, item, unitprice, tax, amount);
        ROWS.push("</tr>");
    })
    TOTAL_ROWS = ROWS.join('');
    return TOTAL_ROWS;
}

//! For regular PDFmake
function createPDFmakeTableRows(template: string, items: any) {
    let ROWS_STRING = '';
    const HEIGHT: string[] = [];
    items.forEach((o: any) => {
        HEIGHT.push("auto");
        ROWS_STRING += JSON.stringify([
            {
                "text": `${o.qty || "1"}`,
                "nodeName": "TD",
                "background": "white",
                "style": [
                    "html-td",
                    "html-tr",
                    "html-tbody",
                    "html-table"
                ]
            },
            {
                "text": `${o.item || ""}`,
                "nodeName": "TD",
                "background": "white",
                "style": [
                    "html-td",
                    "html-tr",
                    "html-tbody",
                    "html-table"
                ]
            },
            {
                "text": `${o.unitprice || "0"}`,
                "nodeName": "TD",
                "background": "white",
                "style": [
                    "html-td",
                    "html-tr",
                    "html-tbody",
                    "html-table"
                ]
            },
            {
                "text": `${o.tax || "0"}`,
                "nodeName": "TD",
                "background": "white",
                "style": [
                    "html-td",
                    "html-tr",
                    "html-tbody",
                    "html-table"
                ]
            },
            {
                "text": `${o.amount || "0"}`,
                "nodeName": "TD",
                "background": "white",
                "style": [
                    "html-td",
                    "html-tr",
                    "html-tbody",
                    "html-table"
                ]
            }
        ]);
        ROWS_STRING += ",";
    })

    return [ROWS_STRING, HEIGHT.join('')];
}

export { convertJSONValues, validateMath, handleTotals };
