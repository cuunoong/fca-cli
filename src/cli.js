#!/usr/bin/env node
require("module-alias/register");

const { program } = require("commander");
const formatContent = require("@/utils/format-content");
const createDataSource = require("@/feature/data/create-data-source");
const createModel = require("@/feature/data/create-model");
const createRepositoryImpl = require("@/feature/data/create-repository-impl");
const createRepository = require("@/feature/domain/create-repository");
const createEntity = require("@/feature/domain/create-entity");
const createUseCase = require("@/feature/domain/create-use-case");
const createPage = require("@/feature/presentation/create-page");
const createWidget = require("@/feature/presentation/create-widget");
const createBloc = require("@/feature/presentation/create-bloc");

program
    .version("1.0.1")
    .description(
        formatContent(
            `The Flutter Clean Architecture Generator CLI tool helps you quickly set up a clean architecture structure in Flutter projects. 
        It creates organized modules and components, making your code scalable and easy to maintain.`
        )
    )
    .name("");

program
    .command("add-feature <featureName>")
    .description(
        "Adds a new feature module to lib/features with a clean folder structure"
    )
    .option("-l, --local", "Create a local data source")
    .action((featureName, options) => {
        createDataSource(featureName, "", options.local ? false : true);
        createModel(featureName);
        createRepositoryImpl(featureName);
        createRepository(featureName);
        createEntity(featureName);
        createUseCase(featureName);
        createPage(featureName);
        createWidget(featureName);
        createBloc(featureName);
    });

program
    .command("add-data-source <featureName> [dataSourceName]")
    .description("Creates a data source within the specified feature.")
    .option("-l, --local", "Create a local data source")
    .action((featureName, dataSourceName, options) => {
        createDataSource(
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
        createRepository(featureName, repositoryName);
        createRepositoryImpl(featureName, repositoryName);
    });

program
    .command("add-model <featureName> <modelName>")
    .description(
        "Creates a data model within the specified feature for handling API or data responses"
    )
    .action((featureName, modelName) => {
        createModel(featureName, modelName);
    });

program
    .command("add-entity <featureName> <entityName>")
    .description(
        "Defines an entity within the specified feature, representing core business objects."
    )
    .action((featureName, entityName) => {
        createEntity(featureName, entityName);
    });

program
    .command("add-use-case <featureName> <useCaseName> [repositoryName]")
    .description(
        "Sets up a use case within the specified feature, focusing on specific business logic."
    )
    .action((featureName, useCaseName, repositoryName) => {
        createUseCase(featureName, useCaseName, repositoryName);
    });

program
    .command("add-page <featureName> [pageName]")
    .description(
        "Adds a page template within the specified feature for user interfaces."
    )
    .action((featureName, pageName) => {
        createPage(featureName, pageName);
    });

program
    .command("add-bloc <featureName> <blocName>")
    .description(
        "Generates a Bloc within the specified feature to handle state management."
    )
    .action((featureName, blocName) => {
        createBloc(featureName, blocName);
    });

program
    .command("add-widget <featureName> <widgetName>")
    .description(
        "Adds a reusable widget within the specified feature for UI components."
    )
    .action((featureName, widgetName) => {
        createWidget(featureName, widgetName);
    });

program.parse(process.argv);
