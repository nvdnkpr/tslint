export function dedent (strings: string[], ...values: string[]) {
    let fullString = strings.reduce((accumulator, str, i) => {
        return accumulator + values[i - 1] + str;
    });

    // match all leading spaces/tabs at the start of each line
    const match = fullString.match(/^[ \t]*(?=\S)/gm);
    // find the smallest indent, we don't want to remove all leading whitespace
    const indent = Math.min.apply(Math, match.map(el => el.length));
    const regexp = new RegExp("^[ \\t]{" + indent + "}", "gm");
    fullString = indent > 0 ? fullString.replace(regexp, "") : fullString;
    return fullString;
}
