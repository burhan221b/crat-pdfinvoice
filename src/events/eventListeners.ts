
function updateDate(initial_date: Date) {
    (<HTMLInputElement>document.getElementById('datePicker')).valueAsDate = initial_date || new Date();
}



export { updateDate };