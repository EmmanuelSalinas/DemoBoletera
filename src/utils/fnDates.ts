import moment from 'moment';

export function dateNow(): moment.Moment {
    return moment();
}
export function formatDate(dateString: string): string {
    if (!dateString) return '';
    return moment(dateString).format('LL');
}


export function formatHours24To12(timeString: string): string {
    if (!timeString) return '';
    return moment(timeString, 'HH:mm:ss').format('hh:mm A');
}