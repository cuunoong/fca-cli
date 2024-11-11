module.exports = (str) => {
    return str
        .trim() // Trim leading and trailing whitespace
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2") // Insert underscore between lowercase and uppercase letters
        .toLowerCase(); // Convert the whole string to lowercase
};
