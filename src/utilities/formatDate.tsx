function formatDate(date: string) {
    const dd = date.split('-')[2];
    const mm = date.split('-')[1];
    const yyyy = date.split('-')[0];

    const formattedDate = dd + '/' + mm + '/' + yyyy;
    return formattedDate;
}

export default formatDate;