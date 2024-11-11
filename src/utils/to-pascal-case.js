module.exports = (str) => {
    return str
        .trim() // Trim leading and trailing whitespace
        .replace(/[_\s]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : "")) // Remove underscores/spaces and capitalize the following letter
        .replace(/^./, (chr) => chr.toUpperCase()); // Capitalize the first letter of the entire string
};
