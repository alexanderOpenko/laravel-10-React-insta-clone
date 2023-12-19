export function strPlural(string, n) {
    const suffixes = new Map([
        ['one', `${string}`],
        ['other', `${string}s`]
    ])

    const rule = new Intl.PluralRules('en-US').select(n);
    const suffix = suffixes.get(rule);
    return `${n} ${suffix}`;
}
