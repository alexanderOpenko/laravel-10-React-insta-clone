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

export function hoursAndMinutes(dateString, timeZone) {
    const date = new Date(dateString)

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, 
        timeZone: timeZone,
    };

    const formattedTime = date.toLocaleTimeString('en-US', options);

    return formattedTime;
}

export default function dateString(created_at) {
    const currentDate = new Date(created_at)
    const currentYear = new Date().getFullYear();
    let currentDateString = `${getMonth(currentDate)} ${currentDate.getDate()}`

    if (currentDate.getFullYear() < currentYear) {
        currentDateString += ` ${currentDate.getFullYear()}`
    }

    return currentDateString
}

export const appURL = import.meta.env.VITE_APP_URL;

