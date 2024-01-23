export function formatPrice(price: number): string {
    return new Intl.NumberFormat("ru-RU").format(price);
}

export function ensureArray(input: any): any[] {
    return Array.isArray(input) ? input : ([input] as any[]);
}

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
