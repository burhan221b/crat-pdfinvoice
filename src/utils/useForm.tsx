import { ChangeEvent, ChangeEventHandler, DetailedHTMLProps, TextareaHTMLAttributes, useEffect, useState } from "react";

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
            row = { id };
            items.push({ id, [name]: value });
        } else {
            row = { ...row, [name]: value }
            items = items.map((o: any) => (o.id === id) ? { ...o, ...row } : o);
        }
        setState({ ...state, items });
    }

    const handleDeleteRow = (id: string) => {
        let items = state.items;
        items = items.filter((o: any) => o.id !== id);
        setState({ ...state, items });
    }


    return { state, handleChange, handleListChange, handleDeleteRow }
}

export default UseForm;