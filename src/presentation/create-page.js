const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    pageName = "",
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "presentation", "pages");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    pageName = pageName.length ? pageName : featureName;
    const fileName = toSnakeCase(pageName);
    const className = toPascalCase(pageName);

    const files = [
        {
            path: path.join(folderPath, `${fileName}_page.dart`),
            content: `
            import 'package:flutter/material.dart';

            class ${className}Page extends StatelessWidget {
                const ${className}Page({Key? key}) : super(key: key);

                static const String routeName = '/${fileName}';

                @override
                Widget build(BuildContext context) {
                    return Scaffold(
                        appBar: AppBar(
                            title: Text('${className}'),
                        ),
                        body: Center(
                            child: Text('${className} Page'),
                        ),
                    );
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
