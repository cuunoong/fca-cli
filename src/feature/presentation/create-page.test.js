const { vol } = require("memfs");
const path = require("path");
const createWidget = require("./create-widget");
const toSnakeCase = require("@/utils/to-snake-case");
const toPascalCase = require("@/utils/to-pascal-case");

jest.mock("fs", () => require("memfs").fs);

describe("createWidget", () => {
    const basePath = "/test_project";
    const featureName = "TestFeature";
    const customWidgetName = "CustomWidget";

    beforeEach(() => {
        vol.reset(); // Clear the virtual filesystem before each test
    });

    test("should not create widget file when widgetName is empty", () => {
        createWidget(featureName, "", basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(
            featureBasePath,
            "presentation",
            "widgets"
        );

        // Check that the folder is created
        expect(vol.existsSync(folderPath)).toBe(true);

        // No widget file should be created
        const widgetFilePath = path.join(
            folderPath,
            `${toSnakeCase(customWidgetName)}_widget.dart`
        );
        expect(vol.existsSync(widgetFilePath)).toBe(false);
    });

    test("should create widget file with custom widget name", () => {
        createWidget(featureName, customWidgetName, basePath);

        const featureBasePath = path.join(
            basePath,
            "lib",
            "features",
            toSnakeCase(featureName)
        );
        const folderPath = path.join(
            featureBasePath,
            "presentation",
            "widgets"
        );
        const widgetFilePath = path.join(
            folderPath,
            `${toSnakeCase(customWidgetName)}_widget.dart`
        );

        // Check that the folder and file are created
        expect(vol.existsSync(folderPath)).toBe(true);
        expect(vol.existsSync(widgetFilePath)).toBe(true);

        // Verify the content of the widget file
        const widgetContent = vol.readFileSync(widgetFilePath, "utf-8");
        expect(widgetContent).toContain(
            `class ${toPascalCase(customWidgetName)}Widget`
        );
        expect(widgetContent).toContain(`Widget build(BuildContext context)`);
        expect(widgetContent).toContain(
            `Text("${toPascalCase(customWidgetName)} Widget")`
        );
    });
});
