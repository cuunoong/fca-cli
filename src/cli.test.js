const { exec } = require("child_process");

describe("FCA CLI", () => {
    test("should display the correct version", (done) => {
        exec("node ./src/cli.js --version", (error, stdout) => {
            expect(stdout.trim()).toBe("0.0.1");
            done();
        });
    });

    test("should display the description in help", (done) => {
        exec("node ./src/cli.js --help", (error, stdout) => {
            expect(stdout).toContain(
                `The Flutter Clean Architecture Generator CLI tool helps you quickly set up a\nclean architecture structure in Flutter projects.`
            );
            done();
        });
    });
});
