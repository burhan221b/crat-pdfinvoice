function convertJSONValues(template: string, data: any) {
    console.log(template)
    //! Still working on it
    // const TABLE_ROWS = createTableRows(template, data.items);
    // // template.replace('${LOGO}', data.logo)// Need to add logo to state
    // template.replace('${DATE}', data.logo)
    // template.replace('${TO_NAME}', data.logo)
    // template.replace('${TO_PHONE}', data.logo)
    // template.replace('${TO_EMAIL}', data.logo)
    // template.replace('${FROM_NAME}', data.logo)
    // template.replace('${FROM_PHONE}', data.logo)
    // template.replace('${FROM_EMAIL}', data.logo)
    // template.replace('${TO_ADDRESS}', data.logo)
    // template.replace('${FROM_ADDRESS}', data.logo)
    // template.replace('${TABLE_ROWS}', TABLE_ROWS)
    // template.replace('${AMOUNT}', data.logo)
    // template.replace('${TOTAL_TAX}', data.logo)
    // template.replace('${TOTAL}', data.logo)
    // template.replace('${NOTES}', data.logo)
}


// function validateMath(qty: number, unitpirce: number, tax: number, amount: number, name: string) {
//     const values = { qty: qty || 1, unitprice: unitpirce || 0, tax: tax || 0, amount: amount || 0 };
//     switch (name) {
//         case "qty":updateValues(values, "qty");
//             break;
//         case "unitprice":updateValues(values, "unitprice");
//             break;
//         case "tax":updateValues(values, "tax");
//             break;
//         case "amount":updateValues(values, "amount");
//             break;
//     }
//     return
// }

function validateMath(values: any, name: string) {
    values = { ...values, qty: values.qty && parseFloat(values.qty) > 0 ? parseFloat(values.qty) : 1, unitprice: parseFloat(values.unitprice) || 0, tax: parseFloat(values.tax) || 0, amount: parseFloat(values.amount) || 0 };
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
    console.log("TESTING VALUES", values)
    return values;
}

function updateAmount(values: any) {
    // (qty * unitprice)  + ((qty * unitprice) * (tax/100))

    values.amount = ((values.qty * values.unitprice) + ((values.qty * values.unitprice) * (values.tax / 100))).toFixed(2);
}

function updateUnitPrice(values: any) {
    // (amount/qty) /(1+tax)
    values.unitprice = ((values.amount / values.qty) / (1 + (values.tax / 100))).toFixed(2);
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
    return [AMOUNT, TAX, TOTAL];
}

export { convertJSONValues, validateMath, handleTotals };
