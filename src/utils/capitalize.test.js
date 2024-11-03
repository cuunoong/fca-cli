const capitalize = require("./capitalize");

describe("capitalize", () => {
    test("should capitalize the first letter of a lowercase word", () => {
        expect(capitalize("hello")).toBe("Hello");
    });

    test("should capitalize the first letter of a mixed-case word", () => {
        expect(capitalize("hELLO")).toBe("HELLO");
    });

    test("should return the same string if first letter is already capitalized", () => {
        expect(capitalize("Hello")).toBe("Hello");
    });

    test("should return an empty string if input is empty", () => {
        expect(capitalize("")).toBe("");
    });

    test("should handle single character strings", () => {
        expect(capitalize("a")).toBe("A");
        expect(capitalize("A")).toBe("A");
    });
});
