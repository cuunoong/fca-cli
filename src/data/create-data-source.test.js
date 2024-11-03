const path = require("path");
const { vol } = require("memfs");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const createDataSource = require("./create-data-source");

jest.mock("fs", () => require("memfs").fs);

describe("createDataSource", () => {
    const basePath = "/test_project";
    const featureName = "Test Feature";
    const customDataSourceName = "Custom Source";

    beforeEach(() => {
        vol.reset();
    });

    test("should create data source files correctly for a remote data source", () => {
        createDataSource(featureName, "", true, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "data_sources");
        const dataSourceFilePath = path.join(
            folderPath,
            "test_feature_remote_data_source.dart"
        );
        const dataSourceImplFilePath = path.join(
            folderPath,
            "test_feature_remote_data_source_impl.dart"
        );

        expect(vol.existsSync(dataSourceFilePath)).toBe(true);
        expect(vol.existsSync(dataSourceImplFilePath)).toBe(true);

        // Check content of the data source file
        const dataSourceContent = vol.readFileSync(dataSourceFilePath, "utf-8");
        expect(dataSourceContent).toBe(
            `abstract interface class ${toPascalCase(
                featureName + " Remote"
            )}DataSource {}`
        );

        // Check content of the data source implementation file
        const dataSourceImplContent = vol.readFileSync(
            dataSourceImplFilePath,
            "utf-8"
        );
        expect(dataSourceImplContent).toContain(
            `import 'test_feature_remote_data_source.dart';`
        );
        expect(dataSourceImplContent).toContain(
            `class ${toPascalCase(
                featureName + " Remote"
            )}DataSourceImpl implements ${toPascalCase(
                featureName + " Remote"
            )}DataSource {}`
        );
    });

    test("should create local data source files correctly", () => {
        createDataSource(featureName, "", false, basePath); // Local data source

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "data_sources");
        const dataSourceFilePath = path.join(
            folderPath,
            "test_feature_local_data_source.dart"
        );
        const dataSourceImplFilePath = path.join(
            folderPath,
            "test_feature_local_data_source_impl.dart"
        );

        // Check if files were created
        expect(vol.existsSync(dataSourceFilePath)).toBe(true);
        expect(vol.existsSync(dataSourceImplFilePath)).toBe(true);

        // Check content of the local data source file
        const dataSourceContent = vol.readFileSync(dataSourceFilePath, "utf-8");
        expect(dataSourceContent).toBe(
            `abstract interface class ${toPascalCase(
                featureName + " Local"
            )}DataSource {}`
        );

        // Check content of the local data source implementation file
        const dataSourceImplContent = vol.readFileSync(
            dataSourceImplFilePath,
            "utf-8"
        );
        expect(dataSourceImplContent).toContain(
            `import 'test_feature_local_data_source.dart';`
        );
        expect(dataSourceImplContent).toContain(
            `class ${toPascalCase(
                featureName + " Local"
            )}DataSourceImpl implements ${toPascalCase(
                featureName + " Local"
            )}DataSource {}`
        );
    });

    test("should create data source files with a custom data source name", () => {
        createDataSource(featureName, customDataSourceName, true, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(featureBasePath, "data", "data_sources");
        const customFileName = `${toSnakeCase(
            customDataSourceName
        )}_remote_data_source.dart`;
        const customImplFileName = `${toSnakeCase(
            customDataSourceName
        )}_remote_data_source_impl.dart`;

        const dataSourceFilePath = path.join(folderPath, customFileName);
        const dataSourceImplFilePath = path.join(
            folderPath,
            customImplFileName
        );

        // Check if files were created with custom data source name
        expect(vol.existsSync(dataSourceFilePath)).toBe(true);
        expect(vol.existsSync(dataSourceImplFilePath)).toBe(true);

        // Check content of the data source file
        const dataSourceContent = vol.readFileSync(dataSourceFilePath, "utf-8");
        expect(dataSourceContent).toBe(
            `abstract interface class ${toPascalCase(
                customDataSourceName + " Remote"
            )}DataSource {}`
        );

        // Check content of the data source implementation file
        const dataSourceImplContent = vol.readFileSync(
            dataSourceImplFilePath,
            "utf-8"
        );
        expect(dataSourceImplContent).toContain(`import '${customFileName}';`);
        expect(dataSourceImplContent).toContain(
            `class ${toPascalCase(
                customDataSourceName + " Remote"
            )}DataSourceImpl implements ${toPascalCase(
                customDataSourceName + " Remote"
            )}DataSource {}`
        );
    });
});
