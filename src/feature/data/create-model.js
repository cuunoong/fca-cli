const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    modelName = "",
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "data", "models");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    modelName = modelName.length ? modelName : featureName;
    const fileName = toSnakeCase(modelName + " model");
    const className = toPascalCase(modelName + " model");

    const entityName = toSnakeCase(modelName);
    const entityClass = toPascalCase(modelName);

    console.log(`Creating ${className} inside ${toPascalCase(featureName)}`);

    const files = [
        {
            path: path.join(folderPath, `${fileName}.dart`),
            content: `
                import '../../domain/entities/${entityName}.dart';

                class ${className} extends ${entityClass} {}`,
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
