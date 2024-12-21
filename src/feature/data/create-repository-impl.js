const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    repositoryName = "",
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "data", "repositories");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    repositoryName = repositoryName.length ? repositoryName : featureName;
    const fileName = toSnakeCase(repositoryName);
    const className = toPascalCase(repositoryName);

    console.log(
        `Creating ${className}RepositoryImpl inside ${toPascalCase(
            featureName
        )}`
    );

    const files = [
        {
            path: path.join(folderPath, `${fileName}_repository_impl.dart`),
            content: `
                import '../../domain/repositories/${fileName}_repository.dart';

                class ${className}RepositoryImpl implements ${className}Repository {
                    const ${className}RepositoryImpl();

                    Future<T> _run<T>(Future<T> Function() function) async {
                        try {
                            return await function();
                        } catch (e) {
                            throw e;
                        }
                    }
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
