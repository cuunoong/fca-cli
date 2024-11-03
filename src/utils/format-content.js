module.exports = (content) => {
    const lines = content.trim().split("\n");
    const trimmedLines = lines.map((line) => line.trim());
    return trimmedLines.join("\n");
};
