import moment from 'moment'
export function datetime() {
    return moment().format('YYYY-MM-DD HH:mm')
}