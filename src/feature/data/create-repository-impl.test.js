const { vol } = require("memfs");
const path = require("path");
const createRepositoryImpl = require("../../feature/data/create-repository-impl");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createRepository", () => {
    const basePath = "/test_project";
    const featureName = "Test Feature";
    const customRepositoryName = "Custom Repository";

    beforeEach(() => {
        vol.reset();
    });

    test("should create repository implementation file with default repository name", () => {
        createRepositoryImpl(featureName, "", basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "repositories");
        const repositoryFilePath = path.join(
            folderPath,
            "test_feature_repository_impl.dart"
        );

        // Check if the file was created
        expect(vol.existsSync(repositoryFilePath)).toBe(true);

        // Check the content of the repository file
        const repositoryContent = vol.readFileSync(repositoryFilePath, "utf-8");
        expect(repositoryContent).toContain(
            `import '../../domain/repositories/test_feature_repository.dart';`
        );
        expect(repositoryContent).toContain(
            `class ${toPascalCase(
                featureName
            )}RepositoryImpl implements ${toPascalCase(
                featureName
            )}Repository {`
        );
    });

    test("should create repository implementation file with custom repository name", () => {
        createRepositoryImpl(featureName, customRepositoryName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "repositories");
        const customRepositoryFilePath = path.join(
            folderPath,
            "custom_repository_repository_impl.dart"
        );

        // Check if the file was created with the custom name
        expect(vol.existsSync(customRepositoryFilePath)).toBe(true);

        // Check the content of the custom repository file
        const customRepositoryContent = vol.readFileSync(
            customRepositoryFilePath,
            "utf-8"
        );
        expect(customRepositoryContent).toContain(
            `import '../../domain/repositories/custom_repository_repository.dart';`
        );
        expect(customRepositoryContent).toContain(
            `class ${toPascalCase(
                customRepositoryName
            )}RepositoryImpl implements ${toPascalCase(
                customRepositoryName
            )}Repository {`
        );
    });
});
