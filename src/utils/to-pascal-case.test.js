const toPascalCase = require("./to-pascal-case");

describe("toPascalCase", () => {
    it("should convert 'Test Feature' to 'TestFeature'", () => {
        expect(toPascalCase("Test Feature")).toBe("TestFeature");
    });

    it("should handle single word strings", () => {
        expect(toPascalCase("feature")).toBe("Feature");
    });

    it("should handle strings with multiple spaces", () => {
        expect(toPascalCase("  Test    Feature  ")).toBe("TestFeature");
    });

    it("should handle mixed case input", () => {
        expect(toPascalCase("tESt feAture")).toBe("TEStFeAture");
    });

    it("should handle mixed pascal input", () => {
        expect(toPascalCase("TestFeature")).toBe("TestFeature");
    });
});
