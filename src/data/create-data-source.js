const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    dataSourceName = "",
    isRemote = true,
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );
    const folderPath = path.join(featureBasePath, "data", "data_sources");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    dataSourceName = dataSourceName.length ? dataSourceName : featureName;
    const naming = isRemote ? "Remote" : "Local";

    const fileName = `${toSnakeCase(dataSourceName)}_${toSnakeCase(naming)}`;
    const className = `${toPascalCase(dataSourceName + " " + naming)}`;
    const files = [
        {
            path: path.join(folderPath, `${fileName}_data_source.dart`),
            content: `abstract interface class ${className}DataSource {}`,
        },
        {
            path: path.join(folderPath, `${fileName}_data_source_impl.dart`),
            content: `
                import '${fileName}_data_source.dart';

                class ${className}DataSourceImpl implements ${className}DataSource {}`,
        },
    ];

    for (const file of files) {
        if (!fs.existsSync(file.path)) {
            fs.writeFileSync(file.path, file.content);

            exec(`dart format ${file.path}`, (error, _, stderr) => {
                if (error) {
                    console.error(`Error formatting file: ${stderr}`);
                }
            });
        }
    }
};
