const { vol } = require("memfs");
const path = require("path");
const createEntity = require("./create-entity");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createEntity", () => {
    const basePath = "/test_project";
    const featureName = "Test Feature";
    const customEntityName = "Custom Entity";

    beforeEach(() => {
        vol.reset(); // Clear the virtual filesystem before each test
    });

    test("should create entity file with default entity name", () => {
        createEntity(featureName, "", basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "entities");
        const entityFilePath = path.join(
            folderPath,
            `${toSnakeCase(featureName)}.dart`
        );

        // Check if the file was created
        expect(vol.existsSync(entityFilePath)).toBe(true);

        // Check the content of the entity file
        const entityContent = vol.readFileSync(entityFilePath, "utf-8");
        expect(entityContent).toContain(
            `class ${toPascalCase(featureName)} {}`
        );
    });

    test("should create entity file with custom entity name", () => {
        createEntity(featureName, customEntityName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "entities");
        const entityFilePath = path.join(
            folderPath,
            `${toSnakeCase(customEntityName)}.dart`
        );

        // Check if the file was created with the custom name
        expect(vol.existsSync(entityFilePath)).toBe(true);

        // Check the content of the custom entity file
        const entityContent = vol.readFileSync(entityFilePath, "utf-8");
        expect(entityContent).toContain(
            `class ${toPascalCase(customEntityName)} {}`
        );
    });
});
