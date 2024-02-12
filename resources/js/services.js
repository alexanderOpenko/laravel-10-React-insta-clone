export function strPlural(string, n) {
    const suffixes = new Map([
        ['one', `${string}`],
        ['other', `${string}s`]
    ])

    const rule = new Intl.PluralRules('en-US').select(n);
    const suffix = suffixes.get(rule);
    return `${n} ${suffix}`;
}

export function ordinalSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13) {
        return number + 'th';
    }
    
    switch (number % 10) {
        case 1: return number + 'st';
        case 2: return number + 'nd';
        case 3: return number + 'rd';
        default: return number + 'th';
    }
}

export const appURL = import.meta.env.VITE_APP_URL;

