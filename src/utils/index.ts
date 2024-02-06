export function convertDate(date: Date): string {
    return date.toISOString().split('T')[0];
}