import { useState } from "react";

export interface initialStateProps {
    [key: string]: any
    // 
}

const useForm = (initialState: initialStateProps) => {
    const [state, setState] = useState(initialState);
    const handleChange = (event: Event) => {
        event.preventDefault();
        const { name, value } = event.target as HTMLInputElement;
        setState({ ...state, [name]: value });
    }
    return [state, handleChange]
}