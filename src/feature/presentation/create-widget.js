const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../../utils/to-snake-case");
const toPascalCase = require("../../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    widgetName = "",
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "presentation", "widgets");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    if (widgetName === "") return;

    const fileName = toSnakeCase(widgetName);
    const className = toPascalCase(widgetName);

    console.log(
        `Creating ${className}Widget inside ${toPascalCase(featureName)}`
    );

    const files = [
        {
            path: path.join(folderPath, `${fileName}_widget.dart`),
            content: `
            import 'package:flutter/material.dart';

            class ${className}Widget extends StatelessWidget {
                const ${className}Widget({super.key});

                @override
                Widget build(BuildContext context) {
                    return const Text("${className} Widget");
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
