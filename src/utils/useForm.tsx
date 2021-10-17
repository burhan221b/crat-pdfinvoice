import { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, TextareaHTMLAttributes, useEffect, useState } from "react";
import basic_invoice_template from '../json/basic_invoice_template.json';
import template2 from "../json/template2.json"
import { handlePDFDownload } from "./handlePDFDownload";
import { handlePDFNewTab } from "./handlePDFNewTab";
import { convertJSONValues, validateMath } from "./utils";






export interface initialStateProps {
    [key: string]: any
}

const UseForm = (initialState: initialStateProps) => {
    const [state, setState] = useState(initialState);
    useEffect(() => {
        console.log("state", state);
        return () => {

        }
    }, [state])

    const handleSubmit = (event: any, state: any, btn: string) => {
        event.preventDefault();
        console.log("CLICKED SUBMIT")
        //! HTML-PDFmake
        // const template = basic_invoice_template.template;
        // const pdf_string_ready = convertJSONValues(template, state);
        // handlePDFDownload(pdf_string_ready);
        //! PDFmake
        let template: any = template2.template;
        template = convertJSONValues(JSON.stringify(template), state);
        const docDefinition = JSON.parse(template) as any;
        // pdfMake.createPdf(docDefinition).open();
        if (btn === "open") handlePDFNewTab(docDefinition);
        else handlePDFDownload(docDefinition);


    }

    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const handleChange = (event: any) => { // Was changed due to text area
        event.preventDefault();
        const { name, value } = event.target;
        setState({ ...state, [name]: value });
    }

    const handleListChange = (event: ChangeEvent<HTMLInputElement>, id: string) => {
        event.preventDefault();
        const { name, value } = event.target as HTMLInputElement;
        console.log("handleListChange", "id", id, "name", name, "value", value)
        let items = state.items || [{ id }];
        let [row] = items.filter((o: any) => o.id === id);
        if (!row) {
            row = { id, [name]: value };
            if (name !== "item") row = validateMath(row, name)
            items.push(row);
        } else {
            row = { ...row, [name]: value }
            if (name !== "item") row = validateMath(row, name)
            items = items.map((o: any) => (o.id === id) ? { ...o, ...row } : o);
        }
        setState({ ...state, items });
    }

    const handleDeleteRow = (id: string) => {
        let items = state.items;
        items = items.filter((o: any) => o.id !== id);
        setState({ ...state, items });
    }

    const handleDirectStateUpdate = (name: string, value: any, id: string) => {
        if (id) { // Only add id if you want to update list
            let items = state.items || [{ id }];
            let [row] = items.filter((o: any) => o.id === id);
            if (!row) {
                row = { id, [name]: value };
                if (name !== "item") row = validateMath(row, name)
                items.push(row);
            } else {
                row = { ...row, [name]: value }
                if (name !== "item") row = validateMath(row, name)
                items = items.map((o: any) => (o.id === id) ? { ...o, ...row } : o);
            }
            setState({ ...state, items });
        }
        else { // For top level state
            setState({ ...state, [name]: value });
        }
    }

    return { state, handleChange, handleListChange, handleDeleteRow, handleSubmit, handleDirectStateUpdate }
}

export default UseForm;