const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (basePath = "", featureName = "", repositoryName = "") => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "domain", "repositories");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    repositoryName = repositoryName.length ? repositoryName : featureName;
    const fileName = toSnakeCase(repositoryName);
    const className = toPascalCase(repositoryName);

    const files = [
        {
            path: path.join(folderPath, `${fileName}_repository.dart`),
            content: `abstract interface class ${className}Repository {}`,
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
