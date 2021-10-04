import React, { CSSProperties, ReactElement, useRef, useEffect, FormEvent } from 'react';
import "../styles/Invoice.css";

export interface InvoiceProps {
    children: Element | ReactElement[] | Element[] | React.FormEvent<HTMLInputElement> | any,
    InvoiceId: string,
    customStyles?: CSSProperties | undefined
}

export interface InvoiceFormProps {
    customStyles?: CSSProperties | undefined
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

const TableRow = () => {
    return (<tr className="form-table-tr">
        <td className="qty-td">1</td>
        <td className="item-td">Maria Anders</td>
        <td className="unitprice-td">11111</td>
        <td className="tax-td">9.13</td>
        <td className="amount-td">11111</td>
        <td className="delete-td"><button>&#10005;</button></td>
    </tr>)
}

const TableRows = () => {

    return (<>
        <TableRow />
        {/* Button To Add Row */}
        <button className="add-row">Add &#10010;</button>
    </>)
}

const FormTable = () => {
    return (
        <div className="form-table-div">
            <table className="form-table">
                <tr className="form-table-tr form-table-tr-headers">
                    <th className="qty-th">QTY</th>
                    <th className="item-th">ITEM</th>
                    <th className="unitprice-th">UNIT PRICE</th>
                    <th className="tax-th">TAX%</th>
                    <th className="amount-th">AMOUNT</th>
                    <th className="delete-th"></th>
                </tr>
                <TableRows />
            </table>
        </div>
    )
}

Invoice.Form = (props: InvoiceFormProps) => {
    const { customStyles } = props
    return (
        <form action="" className="invoice-form" style={customStyles}>
            {/* Logo */}
            <img alt="" className="invoice-logo" src="" />
            <div className="invoice-formality">
                <h1 className="invoice-label">INVOICE</h1>
                {/* Date */}
                <input type="date" className="invoice-date" />
            </div>
            <div className="form-info-container">
                <div className="form-to-container">
                    {/* To Info */}
                    <h4 className="form-h-title">To:</h4>
                    <div className="form-to-info-container">
                        <label htmlFor="" className="form-to-label">Name</label>
                        <input type="text" className="form-to-name" />
                        <label htmlFor="" className="form-to-label">Phone</label>
                        <input type="text" className="form-to-phone" />
                        <label htmlFor="" className="form-to-label">Email</label>
                        <input type="text" className="form-to-email" />
                        <label htmlFor="" className="form-to-label">Address</label>
                        <input type="text" className="form-to-address" />
                    </div>
                </div>
                <div className="form-from-container">
                    <h4 className="form-h-title">From:</h4>
                    {/* From Info */}
                    <div className="form-from-info-container">
                        <label htmlFor="" className="form-from-label">Name</label>
                        <input type="text" className="form-from-name" />
                        <label htmlFor="" className="form-from-label">Phone</label>
                        <input type="text" className="form-from-phone" />
                        <label htmlFor="" className="form-from-label">Email</label>
                        <input type="text" className="form-from-email" />
                        <label htmlFor="" className="form-from-label">Address</label>
                        <input type="text" className="form-from-address" />
                    </div>
                </div>
            </div>
            {/* Table  */}
            <FormTable />
            {/* Notes */}
            <div className="form-notes">
                <h4 className="form-h-title form-notes-title">NOTES:</h4>
                <textarea name="" id="" cols={30} rows={10} className="form-notes-textarea"></textarea>
            </div>
        </form>
    )
}

Invoice.displayName = "Invoice";
export default Invoice;