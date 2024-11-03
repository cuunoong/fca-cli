module.exports = (str) => {
    return str.trim().toLowerCase().replace(/\s+/g, "_");
};
