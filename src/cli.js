#!/usr/bin/env node
const { program } = require("commander");
const formatContent = require("./utils/format-content");
const createDataSource = require("./data/create-data-source");
const createModel = require("./data/create-model");
const createRepositoryImpl = require("./data/create-repository-impl");
const createRepository = require("./domain/create-repository");
const createEntity = require("./domain/create-entity");
const createUseCase = require("./domain/create-use-case");

program
    .version("0.0.1")
    .description(
        formatContent(
            `The Flutter Clean Architecture Generator CLI tool helps you quickly set up a clean architecture structure in Flutter projects. 
        It creates organized modules and components, making your code scalable and easy to maintain.`
        )
    )
    .name("fca-cli");

program
    .command("add-feature <featureName>")
    .description(
        "Adds a new feature module to lib/features with a clean folder structure"
    )
    .action((featureName) => {
        const basePath = process.cwd();
        createDataSource(basePath, featureName);
        createModel(basePath, featureName);
        createRepositoryImpl(basePath, featureName);
        createRepository(basePath, featureName);
        createEntity(basePath, featureName);
        createUseCase(basePath, featureName);
    });

program
    .command("add-data-source <featureName> [dataSourceName]")
    .description("Creates a data source within the specified feature.")
    .option("-l, --local", "Create a local data source")
    .action((featureName, dataSourceName, options) => {
        const basePath = process.cwd();
        createDataSource(
            basePath,
            featureName,
            dataSourceName,
            options.local ? false : true
        );
    });

program
    .command("add-repository <featureName> <repositoryName>")
    .description(
        "Generates a repository template inside a feature for managing data sources"
    )
    .action((featureName, repositoryName) => {
        const basePath = process.cwd();
        createRepository(basePath, featureName, repositoryName);
        createRepositoryImpl(basePath, featureName, repositoryName);
    });

program
    .command("add-model <featureName> <modelName>")
    .description(
        "Creates a data model within the specified feature for handling API or data responses"
    )
    .action((featureName, modelName) => {
        const basePath = process.cwd();
        createModel(basePath, featureName, modelName);
    });

program
    .command("add-entity <featureName> <entityName>")
    .description(
        "Defines an entity within the specified feature, representing core business objects."
    )
    .action((featureName, entityName) => {
        const basePath = process.cwd();
        createEntity(basePath, featureName, entityName);
    });

program
    .command("add-usecase <featureName> <usecaseName> [repositoryName]")
    .description(
        "Sets up a use case within the specified feature, focusing on specific business logic."
    )
    .action((featureName, usecaseName, repositoryName) => {
        const basePath = process.cwd();
        createUseCase(basePath, featureName, usecaseName, repositoryName);
    });

program.parse(process.argv);
