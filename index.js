// @ts-check
'use strict';

/**
 * Generates the command that is necessary to parse the given file.
 *
 * @param {string} file PHP configuration file path (relative or absolute).
 */
exports.command = function (file) {
    file = file.replace(/(["\s'$`\\])/g, '\\$1');

    return `$(which php) -d display_errors=0 -r \'echo @json_encode(@include(__DIR__ . DIRECTORY_SEPARATOR . "${file}"));\'`
};

/**
 * Parses the given file asynchronously, passing the result to the callback
 * function. In case of failure, it triggers the optional onError callback
 * to handle the error.
 *
 * @param {string} file PHP configuration file path (relative or absolute).
 * @param {function(object, Error=, string=, string=)} callback Function that will be triggered upon parsing the file.
 * @param {function(string)=} onError Function that will be triggered upon an error during the parsing of the file.
 */
exports.parse = function (file, callback, onError = (error) => {}) {
    let sh = require('child_process');

    sh.exec(this.command(file), function (err, stdout, stderr) {
        try {
            let result = JSON.parse(stdout.trim());

            if (result) {
                return callback(result, err, stdout, stderr);
            }

            throw new Error('Failed to parse the given file because: ' + result);
        } catch (error) {
            onError(error);
        }
    });
};

/**
 * Parses the given file synchronously, returning the result.
 * In case of failure, it triggers the optional onError callback to handle the error.
 *
 * @param {string} file PHP configuration file path (relative or absolute).
 * @param {function(*)=} onError Function that will be triggered upon an error during the parsing of the file.
 */
exports.parseSync = function (file, onError = (error) => {}) {
    let sh = require('child_process');

    try {
        let result = JSON.parse(
            sh.execSync(
                this.command(file)
            ).toString().trim()
        );

        if (result) {
            return result;
        }

        throw new Error('Failed to parse the given file because: ' + result);
    } catch (error) {
        return onError(error);
    }
}
