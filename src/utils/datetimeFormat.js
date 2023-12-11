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
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const hour = `0${date.getHours()}`.slice(-2)
    const minute = `0${date.getMinutes()}`.slice(-2)
    const second = `0${date.getSeconds()}`.slice(-2)

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}