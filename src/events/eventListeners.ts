
function updateDate(initial_date: Date) {
    (<HTMLInputElement>document.getElementById('datePicker')).valueAsDate = initial_date || new Date();
}

async function deleteRowFadeOut(id: string) {
    document.getElementById(`${id}`)?.classList.add('fade-out');
    await timeout(200);
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { updateDate, deleteRowFadeOut };