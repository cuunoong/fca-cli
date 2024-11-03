const { vol } = require("memfs");
const path = require("path");
const createModel = require("./create-model");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createModel", () => {
    const basePath = "/test_project";
    const featureName = "Test Feature";
    const customModelName = "Custom Model";

    beforeEach(() => {
        vol.reset(); // Clear the virtual filesystem before each test
    });

    test("should create model file with default model name", () => {
        createModel(basePath, featureName);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "models");
        const modelFilePath = path.join(
            folderPath,
            `${toSnakeCase(featureName)}_model.dart`
        );

        // Check if the file was created
        expect(vol.existsSync(modelFilePath)).toBe(true);

        // Check the content of the model file
        const modelContent = vol.readFileSync(modelFilePath, "utf-8");
        expect(modelContent).toContain(
            `import '../../domain/entities/${toSnakeCase(featureName)}.dart';`
        );
        expect(modelContent).toContain(
            `class ${toPascalCase(
                featureName + " model"
            )} implements ${toPascalCase(featureName)} {}`
        );
    });

    test("should create model file with custom model name", () => {
        createModel(basePath, featureName, customModelName);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "models");
        const modelFilePath = path.join(
            folderPath,
            `${toSnakeCase(customModelName)}_model.dart`
        );

        // Check if the file was created with the custom name
        expect(vol.existsSync(modelFilePath)).toBe(true);

        // Check the content of the custom model file
        const modelContent = vol.readFileSync(modelFilePath, "utf-8");
        expect(modelContent).toContain(
            `import '../../domain/entities/${toSnakeCase(
                customModelName
            )}.dart';`
        );
        expect(modelContent).toContain(
            `class ${toPascalCase(
                customModelName + " model"
            )} implements ${toPascalCase(customModelName)} {}`
        );
    });
});
