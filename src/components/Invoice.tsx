import React, { CSSProperties, ReactElement, useRef, useEffect, FormEvent, ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { deleteRowFadeOut, updateDate } from '../events/eventListeners';
// import "../styles/Invoice.css";
import "../styles/InvoiceV1.css";
import UseForm from '../utils/useForm';
import { handleTotals } from '../utils/utils';

export interface InvoiceProps {
    children: Element | ReactElement[] | Element[] | React.FormEvent<HTMLInputElement> | any,
    InvoiceId: string,
    customStyles?: CSSProperties | undefined
}

export interface InvoiceFormProps {
    customStyles?: CSSProperties | undefined
}

export interface PassingStateProps {
    state?: any,
    handleListChange?: any,
    handleDeleteRow?: any,
    row?: any,
    index?: number,
    id?: string,
    handleDeleteBtn?: any,
    updateRow?: any,
    handleDirectStateUpdate?: any
}

export interface TableTotalProps {
    TOTAL: number,
    TAX: number,
    AMOUNT: number,
    index?: number,
    id?: string,
}

export interface Row {
    qty: number,
    item: string,
    unit_price: number,
    tax: number,
    amount: number,
    id: string
}

// Main Body of Invoice
const Invoice = (props: InvoiceProps) => {
    const { children, customStyles, InvoiceId } = props
    return (<>
        <div className="invoice" id={InvoiceId} style={customStyles}>{children}</div>
    </>);
}

// Invoice Check/Type (Single vs Company)

// Invoice Form 
/*
- Date
- Customer info
- Customer address
- Add button to add row
- Remove/Delete button to remove row
- QTY
- Items 
- Unit price
- Tax
- Price 
- Show Preview (Current Total)
- Create PDF Invoice Button
*/


const TableTotalRow = (props: TableTotalProps) => {
    const { AMOUNT, TAX, TOTAL } = props;
    return (<><tr className="last-tr form-table-tr">
        <td className="qty-td"></td>
        <td className="item-td"></td>
        <td className="unitprice-td"></td>
        <td className="tax-td"><strong>AMOUNT</strong></td>
        <td className="amount-td" id="AMOUNT">{AMOUNT}</td>
        <td className="delete-td"></td>
    </tr>
        <tr className="last-tr form-table-tr">
            <td className="qty-td"></td>
            <td className="item-td"></td>
            <td className="unitprice-td"></td>
            <td className="tax-td"><strong>TAX</strong></td>
            <td className="amount-td" id="TAX">{TAX}</td>
            <td className="delete-td"></td>
        </tr>
        <tr className="last-tr form-table-tr">
            <td className="qty-td"></td>
            <td className="item-td"></td>
            <td className="unitprice-td"></td>
            <td className="tax-td TOTAL"><strong>TOTAL</strong></td>
            <td className="amount-td TOTAL" id="TOTAL">{TOTAL}</td>
            <td className="delete-td"></td>
        </tr>
    </>)
}

const TableRow = (props: PassingStateProps) => {
    const { row, index, updateRow, handleDeleteBtn, id } = props;
    return (<tr key={index} id={id} className="fade-in form-table-tr">
        <td className="qty-td"><input onChange={(e) => updateRow(e, id)} name="qty" value={row.qty} type="number" className="input-qty" /></td>
        <td className="item-td"><input onChange={(e) => updateRow(e, id)} name="item" value={row.item} type="text" className="input-item" placeholder="Item Name Here" /></td>
        <td className="unitprice-td"><input onChange={(e) => updateRow(e, id)} name="unitprice" value={row.unitprice} type="number" className="input-unitprice" /></td>
        <td className="tax-td"><input onChange={(e) => updateRow(e, id)} name="tax" value={row.tax} type="number" className="input-tax" /></td>
        <td className="amount-td"><input onChange={(e) => updateRow(e, id)} name="amount" value={row.amount} type="number" className="input-amount" /></td>
        <td className="delete-td"><button onClick={() => handleDeleteBtn(id)} name="delete" type="button" className="btn" id="btn-deleterow">&#10005;</button></td>
    </tr>)
}


const TableRows = (props: PassingStateProps) => {
    const { state, handleListChange, handleDeleteRow } = props;
    let [rows, setRows] = useState<any[]>([]);
    const updateRow = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        e.preventDefault()
        let [temp] = rows.filter((o: any) => o.id === id);
        const { name, value } = e.target;
        temp = { ...temp, [name]: value }
        const newRows = rows.map((o: any) => (o.id === id) ? temp : o);
        setRows(newRows);
        handleListChange(e, id)
    }

    const handleDeleteBtn = async (id: string) => {
        let temp = rows.filter((o: any) => o.id !== id);
        await deleteRowFadeOut(id);
        handleDeleteRow(id);
        setRows(temp);
    }

    useEffect(() => {
        const items = state.items || [];
        console.log("useEffect items", items)
        setRows([...items])
        return () => {

        }
    }, [state.items])

    const createTableRows = () => {
        return rows.map((row: Row, index: number) => (
            <TableRow updateRow={updateRow} handleDeleteBtn={handleDeleteBtn} key={row.id} id={row.id} index={index} row={row} />
        ))
    }

    const createTableTotal = () => {
        const items = state.items;
        const [AMOUNT, TAX, TOTAL] = handleTotals(items);
        return (
            <TableTotalRow AMOUNT={AMOUNT} TAX={TAX} TOTAL={TOTAL} />
        )
    }

    return (<>
        {createTableRows()}
        <button type="button" onClick={() => setRows([...rows, { id: uuidv4(), qty: 1, item: "", unitprice: 0, tax: 0, amount: 0 }])} className="btn add-row" id="btn-addrow">Add &#10010;</button>
        {createTableTotal()}

    </>)
}


const FormTable = (props: PassingStateProps) => {
    const { state, handleListChange, handleDeleteRow, handleDirectStateUpdate } = props;
    useEffect(() => {
        const dt = new Date();
        handleDirectStateUpdate("date", dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
        updateDate(dt);

        return () => {

        }
    }, [])
    return (
        <div className="container-box form-table-div">
            <table className="form-table">
                <thead>
                    <tr className="form-table-tr form-table-tr-headers">
                        <th className="qty-th">QTY</th>
                        <th className="item-th">ITEM</th>
                        <th className="unitprice-th">UNIT PRICE</th>
                        <th className="tax-th">TAX%</th>
                        <th className="amount-th">AMOUNT</th>
                        <th className="delete-th"></th>
                    </tr>
                </thead>
                <tbody>
                    <TableRows state={state} handleListChange={handleListChange} handleDeleteRow={handleDeleteRow} />
                </tbody>
            </table>
        </div>
    )
}

Invoice.Form = (props: InvoiceFormProps) => {
    const { customStyles } = props
    const { state, handleChange, handleListChange, handleDeleteRow, handleSubmit, handleDirectStateUpdate } = UseForm({ items: [] });
    return (
        // <form onSubmit={(e) => handleSubmit(e, state)} className="invoice-form" style={customStyles}>
        <form className="invoice-form" style={customStyles}>
            <div className="container-box invoice-form-header">
                {/* Logo */}
                <img alt="" className="invoice-logo" src="https://source.unsplash.com/random/200x150" />
                <div className="invoice-formality">
                    <h1 className="invoice-label">INVOICE</h1>
                    {/* Date */}
                    <input onChange={handleChange} name="date" id="datePicker" type="date" className="invoice-date" />
                </div>
            </div>
            <div className="form-info-container">
                <div className="container-box form-to-container">
                    {/* To Info */}
                    <h4 className="form-h-title">To:</h4>
                    <div className="form-to-info-container">
                        <label htmlFor="" className="form-to-label">Name</label>
                        <input onChange={handleChange} name="to_name" value={state.to_name} type="text" className="form-to-name" />
                        <label htmlFor="" className="form-to-label">Phone</label>
                        <input onChange={handleChange} name="to_phone" value={state.to_phone} type="text" className="form-to-phone" />
                        <label htmlFor="" className="form-to-label">Email</label>
                        <input onChange={handleChange} name="to_email" value={state.to_email} type="text" className="form-to-email" />
                        <label htmlFor="" className="form-to-label">Address</label>
                        <input onChange={handleChange} name="to_address" value={state.to_address} type="text" className="form-to-address" />
                    </div>
                </div>
                <div className="container-box form-from-container">
                    <h4 className="form-h-title">From:</h4>
                    {/* From Info */}
                    <div className="form-from-info-container">
                        <label htmlFor="" className="form-from-label">Name</label>
                        <input onChange={handleChange} name="from_name" value={state.from_name} type="text" className="form-from-name" />
                        <label htmlFor="" className="form-from-label">Phone</label>
                        <input onChange={handleChange} name="from_phone" value={state.from_phone} type="text" className="form-from-phone" />
                        <label htmlFor="" className="form-from-label">Email</label>
                        <input onChange={handleChange} name="from_email" value={state.from_email} type="text" className="form-from-email" />
                        <label htmlFor="" className="form-from-label">Address</label>
                        <input onChange={handleChange} name="from_address" value={state.from_address} type="text" className="form-from-address" />
                    </div>
                </div>
            </div>
            {/* Table  */}
            {Object.keys(state).length > 0 && <FormTable state={state} handleListChange={handleListChange} handleDeleteRow={handleDeleteRow} handleDirectStateUpdate={handleDirectStateUpdate} />}
            {/* Notes */}
            <div className="container-box form-notes">
                <h4 className="form-h-title form-notes-title">NOTES:</h4>
                <textarea onChange={handleChange} name="form_notes" id="" cols={30} rows={10} className="form-notes-textarea" />
            </div>
            <div className="form-submit">
                <button type="button" onClick={(e) => handleSubmit(e, state, "open")} className="btn form-submit-btn" id="btn-opentab">Open New Tab</button>
                <button type="button" onClick={(e) => handleSubmit(e, state, "download")} className="btn form-submit-btn" id="btn-download">Download</button>
            </div>
        </form>
    )
}

Invoice.displayName = "Invoice";
export default Invoice;