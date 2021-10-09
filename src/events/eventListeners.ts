
function updateDate() {
    (<HTMLInputElement>document.getElementById('datePicker')).valueAsDate = new Date();
}



export { updateDate };