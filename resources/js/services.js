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

export function getMonth(date) {
   return date.toLocaleString('en', { month: 'long' })
}

export function hoursAndMinutes(dateString) {
    const date = new Date(dateString)

    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`

    return formattedTime
}

export const appURL = import.meta.env.VITE_APP_URL;

