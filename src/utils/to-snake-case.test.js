const toSnakeCase = require("./to-snake-case");

describe("toSnakeCase", () => {
    it("should convert 'Test Feature' to 'test_feature'", () => {
        expect(toSnakeCase("Test Feature")).toBe("test_feature");
    });

    it("should handle single word strings", () => {
        expect(toSnakeCase("Feature")).toBe("feature");
    });

    it("should handle strings with multiple spaces", () => {
        expect(toSnakeCase("  Test    Feature  ")).toBe("test_feature");
    });

    it("should handle mixed case input", () => {
        expect(toSnakeCase("tESt FeAture")).toBe("t_est_fe_ature");
    });
});
