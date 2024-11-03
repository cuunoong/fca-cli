const formatContent = require("./format-content");

describe("formatContent", () => {
    test("should remove leading spaces from each line of a multi-line string", () => {
        const input = `
            line one
            line two
            line three
        `;
        const expectedOutput = `line one\nline two\nline three`;
        expect(formatContent(input)).toBe(expectedOutput);
    });

    test("should handle single-line strings with leading spaces", () => {
        const input = "   single line";
        const expectedOutput = "single line";
        expect(formatContent(input)).toBe(expectedOutput);
    });

    test("should handle strings with no leading spaces", () => {
        const input = `line one\nline two\nline three`;
        expect(formatContent(input)).toBe(input);
    });

    test("should handle empty lines between content", () => {
        const input = `
            line one
            
            line two
        `;
        const expectedOutput = `line one\n\nline two`;
        expect(formatContent(input)).toBe(expectedOutput);
    });

    test("should handle an empty string", () => {
        expect(formatContent("")).toBe("");
    });

    test("should trim leading and trailing spaces on each line but keep line structure intact", () => {
        const input = `
            line one     
            line two    
        `;
        const expectedOutput = `line one\nline two`;
        expect(formatContent(input)).toBe(expectedOutput);
    });
});
