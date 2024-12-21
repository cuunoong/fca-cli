const { vol } = require("memfs");
const path = require("path");
const createUseCase = require("./create-use-case");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createUseCase", () => {
    const basePath = "/test_project";
    const featureName = "Test Feature";
    const repositoryName = "Auth";

    beforeEach(() => {
        vol.reset(); // Clear the virtual filesystem before each test
    });

    test("should create use case folder when useCaseName is empty", () => {
        createUseCase(featureName, "", repositoryName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "use_cases");

        // Check if the folder was created
        expect(vol.existsSync(folderPath)).toBe(true);
    });

    test("should create use case file with the correct content when useCaseName is provided", () => {
        const useCaseName = "Get Auth";
        createUseCase(featureName, useCaseName, repositoryName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "use_cases");
        const useCaseFilePath = path.join(
            folderPath,
            `${toSnakeCase(useCaseName + " use case")}.dart`
        );

        // Check if the file was created
        expect(vol.existsSync(useCaseFilePath)).toBe(true);

        // Check the content of the use case file
        const useCaseContent = vol.readFileSync(useCaseFilePath, "utf-8");
        expect(useCaseContent).toContain(
            `import '../repositories/${toSnakeCase(
                repositoryName
            )}_repository.dart';`
        );
        expect(useCaseContent).toContain(
            `class ${toPascalCase(useCaseName + " use case")} {`
        );
        expect(useCaseContent).toContain(
            `final ${toPascalCase(repositoryName)}Repository _repository;`
        );
        expect(useCaseContent).toContain(
            `${toPascalCase(
                useCaseName + " use case"
            )}({required ${toPascalCase(
                repositoryName
            )}Repository repository}): _repository = repository;`
        );
        expect(useCaseContent).toContain("Future<void> call() async {}");
    });

    test("should create use case file with custom repository name", () => {
        const useCaseName = "Get Auth";
        const customRepositoryName = "Custom Auth";
        createUseCase(featureName, useCaseName, customRepositoryName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "domain", "use_cases");
        const useCaseFilePath = path.join(
            folderPath,
            `${toSnakeCase(useCaseName + " use case")}.dart`
        );

        // Check if the file was created
        expect(vol.existsSync(useCaseFilePath)).toBe(true);

        // Check the content of the use case file with custom repository name
        const useCaseContent = vol.readFileSync(useCaseFilePath, "utf-8");
        expect(useCaseContent).toContain(
            `import '../repositories/${toSnakeCase(
                customRepositoryName
            )}_repository.dart';`
        );
        expect(useCaseContent).toContain(
            `class ${toPascalCase(useCaseName + " use case")} {`
        );
        expect(useCaseContent).toContain(
            `final ${toPascalCase(customRepositoryName)}Repository _repository;`
        );
        expect(useCaseContent).toContain(
            `${toPascalCase(
                useCaseName + " use case"
            )}({required ${toPascalCase(
                customRepositoryName
            )}Repository repository}): _repository = repository;`
        );
        expect(useCaseContent).toContain("Future<void> call() async {}");
    });
});
