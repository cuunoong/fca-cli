# Flutter Clean Architecture CLI (`fca-cli`)

The **Flutter Clean Architecture CLI** (`fca-cli`) is a command-line tool that helps you quickly set up a **clean architecture** structure in Flutter projects. It provides organized modules and components, making your code more scalable, testable, and easier to maintain.

## Installation

You can install `fca-cli` globally:

```bash
npm install -g fca-cli@latest
```

Or, you can run it using `npx` without installation:

```bash
npx fca-cli@latest [options] [command]
```

## Usage

```bash
fca-cli [options] [command]
```

This CLI tool supports various commands to generate specific components within your Flutter project's clean architecture.

### Options

-   `-V, --version`  
    Output the version number of `fca-cli`.

-   `-h, --help`  
    Display help for the command.

## Deprecation Notice

    ⚠️ The `fca-cli add-usecase` command is deprecated.
    Please use the new command `fca-cli add-use-case` instead.

### Commands

| Command                                                    | Description                                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `add-feature <featureName> [options]`                      | Adds a new feature module to `lib/features` with a clean folder structure.            |
| `add-data-source [options] <featureName> [dataSourceName]` | Creates a data source (local or remote) within the specified feature.                 |
| `add-repository <featureName> <repositoryName>`            | Generates a repository template inside a feature for managing data sources.           |
| `add-model <featureName> <modelName>`                      | Creates a data model within the specified feature for handling API or data responses. |
| `add-entity <featureName> <entityName>`                    | Defines an entity within the specified feature, representing core business objects.   |
| `add-usecase <featureName> <usecaseName> [repositoryName]` | Sets up a use case within the specified feature, focusing on specific business logic. |
| `add-page <featureName> [pageName]`                        | Adds a page template within the specified feature for user interfaces.                |
| `add-bloc <featureName> <blocName>`                        | Generates a Bloc within the specified feature to handle state management.             |
| `add-widget <featureName> <widgetName>`                    | Adds a reusable widget within the specified feature for UI components.                |
| `help [command]`                                           | Display help for a specific command.                                                  |

## Example Usage

Here are some examples of how you can use `fca-cli` to generate various components:

1. **Add a Feature**:

    ```bash
    fca-cli add-feature Authentication
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-feature Authentication
    ```

2. **Add a Repository**:

    ```bash
    fca-cli add-repository Authentication Auth
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-repository Authentication Auth
    ```

3. **Add a Local Data Source**:

    ```bash
    fca-cli add-data-source -local Authentication Auth
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-data-source -local Authentication Auth
    ```

4. **Add a Model**:

    ```bash
    fca-cli add-model Authentication User
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-model Authentication User
    ```

5. **Add an Entity**:

    ```bash
    fca-cli add-entity Authentication User
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-entity Authentication User
    ```

6. **Add a Use Case**:

    ```bash
    fca-cli add-use-case Authentication Login
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-use-case Authentication Login
    ```

7. **Add a Page**:

    ````bash
    fca-cli add-page Authentication Login

    or using `npx`:

    ```bash
    npx fca-cli@latest add-page Authentication Login
    ````

8. **Add a Bloc**:

    ```bash
    fca-cli add-bloc Authentication Login
    ```

    or using `npx`:

    ```bash
    npx fca-cli@latest add-bloc Authentication Login
    ```

9. **Add a Widget**:
    ```bash
    fca-cli add-widget Authentication LoginButton
    ```
    or using `npx`:
    ```bash
    npx fca-cli@latest add-widget Authentication LoginButton
    ```

## Help

For help on a specific command, use:

```bash
fca-cli help <command>
```

Example:

```bash
fca-cli help add-model
```

or using `npx`:

```bash
npx fca-cli@latest help add-model
```

## License

This project is licensed under the MIT License.
