export function convertDate(date: Date): string {
    return date.toISOString().split('T')[0];
}
export function getF(c: number): number {
    return ((9 / 5) * c) + 32;
}
export function getC(c: number): number {
    return (5 / 9) * (c - 32);
}