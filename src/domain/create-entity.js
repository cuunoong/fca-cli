const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    entityName = "",
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "domain", "entities");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    entityName = entityName.length ? entityName : featureName;
    const fileName = toSnakeCase(entityName);
    const className = toPascalCase(entityName);

    const files = [
        {
            path: path.join(folderPath, `${fileName}.dart`),
            content: `class ${className} {}`,
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
