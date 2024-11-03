const fs = require("fs");
const path = require("path");
const toSnakeCase = require("../utils/to-snake-case");
const toPascalCase = require("../utils/to-pascal-case");
const { exec } = require("child_process");

module.exports = (
    featureName = "",
    blocName = "",
    basePath = process.cwd()
) => {
    const featureBasePath = path.join(
        basePath,
        "lib",
        "features",
        toSnakeCase(featureName)
    );

    const folderPath = path.join(featureBasePath, "presentation", "blocs");
    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    if (blocName === "") return;

    const fileName = toSnakeCase(blocName);
    const className = toPascalCase(blocName);

    const files = [
        {
            path: path.join(folderPath, `${fileName}_bloc.dart`),
            content: `
                import 'package:bloc/bloc.dart';
                import 'package:flutter/material.dart';
                
                part '${fileName}_state.dart';
                part '${fileName}_event.dart';

                class ${className}Bloc extends Bloc<${className}Event, ${className}State> {
                    ${className}Bloc() : super(InitialState());
                }
            `,
        },
        {
            path: path.join(folderPath, `${fileName}_state.dart`),
            content: `
                part of ${fileName}_bloc.dart;

                @immutable
                sealed class ${className}State {}

                final class InitialState extends ${className}State {}

                final class LoadingState extends ${className}State {}

                final class SuccessState<T> extends ${className}State {
                    final T data;

                    SuccessState(this.data);
                }

                final class FailureState extends ${className}State {
                    final String message;

                    FailureState(this.message);
                }
            `,
        },
        {
            path: path.join(folderPath, `${fileName}_event.dart`),
            content: `
                part of ${fileName}_bloc.dart;

                @immutable
                sealed class ${className}Event {}
            `,
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
