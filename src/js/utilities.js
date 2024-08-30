/**
 * Formats a given date.
 *
 * @param {Date} date - the date to be formatted
 * @return {string} the formatted date
 */
function formatDateToYYYY_MM_DD(date) {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

export { formatDateToYYYY_MM_DD }