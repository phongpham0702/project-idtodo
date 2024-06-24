function toISODate(date: string) {
    const dd = date.split('/')[0];
    const mm = date.split('/')[1];
    const yyyy = date.split('/')[2];

    const ISODate = yyyy + '-' + mm + '-' + dd;
    return ISODate;
}

export default toISODate;