export const datetimeFormat = (datetime) => {
    if (!datetime) return '';
    let date;
    if (datetime instanceof Date) {
        date = datetime;
    }
    else {
        datetime = new Date(datetime);
        if (datetime.toString() === 'Invalid Date') return '';
        date = new Date(datetime);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = `0${date.getHours()}`.slice(-2);
    const minute = `0${date.getMinutes()}`.slice(-2);
    const second = `0${date.getSeconds()}`.slice(-2);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}