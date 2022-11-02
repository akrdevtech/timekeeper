const ellipsifyString = (text, maxLength, options) => {
    let startSlice = 0;
    let endSlice = 3;
    if (options) {
        startSlice = options.startSlice || 0;
        endSlice = options.endSlice || 3;
    }
    const textLength = text.length;
    if (textLength < maxLength) {
        return text;
    }
    const lastSlice = text.substring(textLength - endSlice);
    if (startSlice) {
        const firstSlice = text.substring(0, startSlice);
        return `${firstSlice}***${lastSlice}`;
    }
    const restOfText = text.substring(0, maxLength - (3 + endSlice))
    if (restOfText.length < 1) {
        return text;
    }
    return `${restOfText}***${lastSlice}`;
}

const stringHelpers = {
    ellipsifyString
}

export default stringHelpers;