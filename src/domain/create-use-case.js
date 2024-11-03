const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    basePath = "",
    featureName = "",
    useCaseName = "",
    repositoryName = ""
) => {
    const repositoryBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(repositoryBasePath, "domain", "use_cases");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    if (!useCaseName) return;

    useCaseName = useCaseName + " use case";
    repositoryName =
        (repositoryName.length ? repositoryName : featureName) + " repository";

    const fileName = toSnakeCase(useCaseName);
    const className = toPascalCase(useCaseName);

    const repositoryFileName = toSnakeCase(repositoryName);
    const repositoryClassName = toPascalCase(repositoryName);

    const files = [
        {
            path: path.join(folderPath, `${fileName}.dart`),
            content: `
            import '../repositories/${repositoryFileName}.dart';

            class ${className} {
                final ${repositoryClassName} _repository;

                ${className}(this._repository);

                Future<void> call() async {}
            }`,
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
