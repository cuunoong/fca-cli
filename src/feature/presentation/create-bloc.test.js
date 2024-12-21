const { vol } = require("memfs");
const path = require("path");
const createBloc = require("./create-bloc");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createBloc", () => {
    const basePath = "/test_project";
    const featureName = "TestFeature";
    const blocName = "TestBloc";

    beforeEach(() => {
        vol.reset(); // Clear the virtual filesystem before each test
    });

    test("should not create bloc files if bloc name is empty", () => {
        createBloc(featureName, "", basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "presentation", "blocs");

        // Check that the folder is created but no bloc files are present
        expect(vol.existsSync(folderPath)).toBe(true);
        const blocFilePath = path.join(
            folderPath,
            `${toSnakeCase(blocName)}_bloc.dart`
        );
        const stateFilePath = path.join(
            folderPath,
            `${toSnakeCase(blocName)}_state.dart`
        );
        const eventFilePath = path.join(
            folderPath,
            `${toSnakeCase(blocName)}_event.dart`
        );
        expect(vol.existsSync(blocFilePath)).toBe(false);
        expect(vol.existsSync(stateFilePath)).toBe(false);
        expect(vol.existsSync(eventFilePath)).toBe(false);
    });

    test("should create bloc files with correct structure and content", () => {
        createBloc(featureName, blocName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "presentation", "blocs");

        const blocFilePath = path.join(
            folderPath,
            `${toSnakeCase(blocName)}_bloc.dart`
        );
        const stateFilePath = path.join(
            folderPath,
            `${toSnakeCase(blocName)}_state.dart`
        );
        const eventFilePath = path.join(
            folderPath,
            `${toSnakeCase(blocName)}_event.dart`
        );

        // Check that the folder and files are created
        expect(vol.existsSync(folderPath)).toBe(true);
        expect(vol.existsSync(blocFilePath)).toBe(true);
        expect(vol.existsSync(stateFilePath)).toBe(true);
        expect(vol.existsSync(eventFilePath)).toBe(true);

        // Verify the content of the bloc file
        const blocContent = vol.readFileSync(blocFilePath, "utf-8");
        expect(blocContent).toContain(
            `class ${toPascalCase(blocName)}Bloc extends Bloc<${toPascalCase(
                blocName
            )}Event, ${toPascalCase(blocName)}State>`
        );
        expect(blocContent).toContain(
            `part '${toSnakeCase(blocName)}_state.dart'`
        );
        expect(blocContent).toContain(
            `part '${toSnakeCase(blocName)}_event.dart'`
        );

        // Verify the content of the state file
        const stateContent = vol.readFileSync(stateFilePath, "utf-8");
        expect(stateContent).toContain(
            `part of '${toSnakeCase(blocName)}_bloc.dart'`
        );
        expect(stateContent).toContain(
            `sealed class ${toPascalCase(blocName)}State`
        );
        expect(stateContent).toContain(
            `final class InitialState extends ${toPascalCase(blocName)}State`
        );
        expect(stateContent).toContain(
            `final class SuccessState<T> extends ${toPascalCase(blocName)}State`
        );
        expect(stateContent).toContain(
            `final class FailureState extends ${toPascalCase(blocName)}State`
        );

        // Verify the content of the event file
        const eventContent = vol.readFileSync(eventFilePath, "utf-8");
        expect(eventContent).toContain(
            `part of '${toSnakeCase(blocName)}_bloc.dart'`
        );
        expect(eventContent).toContain(
            `sealed class ${toPascalCase(blocName)}Event`
        );
    });
});
