# FCA CLI (Flutter Clean Architecture Generator)

FCA CLI is a command-line tool that helps you quickly set up a clean architecture structure in Flutter projects. It creates organized modules and components, making your code scalable and easy to maintain.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [Commands](#commands)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

You can install FCA CLI globally using npm. Ensure that you have Node.js and npm installed on your system.

```bash
npm install -g fca-cli
```

Alternatively, you can use `npx` to run the CLI without installing it globally:

```bash
npx fca-cli
```

## Usage

To get started, run the following command:

```bash
fca-cli [command]
```

Replace `[command]` with one of the available commands listed below.

## Commands

### `fca-cli add-feature <featureName>`

Adds a new feature module to `lib/features` with a clean folder structure.

```bash
fca-cli add-feature myNewFeature
```

### `fca-cli add-data-source <featureName> [dataSourceName]`

Creates a data source within the specified feature.

```bash
fca-cli add-data-source myNewFeature myDataSource --local
```

-   Use the `--local` option to create a local data source.

### `fca-cli add-repository <featureName> <repositoryName>`

Generates a repository template inside a feature for managing data sources.

```bash
fca-cli add-repository myNewFeature myRepository
```

### `fca-cli add-model <featureName> <modelName>`

Creates a data model within the specified feature for handling API or data responses.

```bash
fca-cli add-model myNewFeature myModel
```

### `fca-cli add-entity <featureName> <entityName>`

Defines an entity within the specified feature, representing core business objects.

```bash
fca-cli add-entity myNewFeature myEntity
```

### `fca-cli add-usecase <featureName> <usecaseName> [repositoryName]`

Sets up a use case within the specified feature, focusing on specific business logic.

```bash
fca-cli add-usecase myNewFeature myUseCase myRepository
```

### Additional Commands

(Add any additional commands and descriptions as you implement them)

## Contributing

Contributions are welcome! If you have suggestions or improvements, please create an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/MyFeature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/MyFeature`
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more information on Flutter and Clean Architecture, visit the official documentation at [Flutter Docs](https://flutter.dev/docs) and [Clean Architecture](https://www.baeldung.com/clean-architecture).
