const { vol } = require("memfs");
const path = require("path");
const createRepository = require("./create-repository");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createRepository", () => {
    const basePath = "/test_project";
    const featureName = "Test Feature";
    const customRepositoryName = "Custom Repository";

    beforeEach(() => {
        vol.reset(); // Clear the virtual filesystem before each test
    });

    test("should create repository file with default repository name", () => {
        createRepository(featureName, "", basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "repositories");
        const repositoryFilePath = path.join(
            folderPath,
            `${toSnakeCase(featureName)}_repository.dart`
        );

        // Check if the file was created
        expect(vol.existsSync(repositoryFilePath)).toBe(true);

        // Check the content of the repository file
        const repositoryContent = vol.readFileSync(repositoryFilePath, "utf-8");
        expect(repositoryContent).toContain(
            `abstract interface class ${toPascalCase(featureName)}Repository {}`
        );
    });

    test("should create repository file with custom repository name", () => {
        createRepository(featureName, customRepositoryName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "repositories");
        const repositoryFilePath = path.join(
            folderPath,
            `${toSnakeCase(customRepositoryName)}_repository.dart`
        );

        // Check if the file was created with the custom name
        expect(vol.existsSync(repositoryFilePath)).toBe(true);

        // Check the content of the custom repository file
        const repositoryContent = vol.readFileSync(repositoryFilePath, "utf-8");
        expect(repositoryContent).toContain(
            `abstract interface class ${toPascalCase(
                customRepositoryName
            )}Repository {}`
        );
    });
});
