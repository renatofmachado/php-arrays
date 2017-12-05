'use strict';

var expect = require('chai').expect;
var parser = require('../index');

var config = {
    foo: 'bar'
};

describe('parser', () => {
    it('should be able to parse the given file asynchronously', (done) => {
        parser.parse('./test/config.php', (result) => {
            expect(result).to.deep.equal(config);
            done();
        });
    });

    it('should fail to parse a non-existent file asynchronously', (done) => {
        parser.parse('./non-existent.php', (result) => {
            done(new Error("Should not have been able to parse the given file."));
        }, (error) => {
            done();
        });
    });

    it('should be able to parse the given file synchronously', () => {
        let result = parser.parseSync('./test/config.php');
        expect(result).to.deep.equal(config);
    });

    it('should fail to parse a non-existent file synchronously', (done) => {
        parser.parseSync('./non-existent.php', (error) => {
            done();
        });
    });

    it('should retrive undefined value if no onError callback is passed', () => {
        let result = parser.parseSync('./non-existent.php');

        expect(result).to.equal(undefined);
    });

    it('should call onError callback when it fails to transform the result into JSON', (done) => {
        parser.parseSync('./config-with-errors.php', (error) => {
            done();
        });
    });

    it('should sanitize file input', () => {
        let command = parser.command;

        expect(command('./config.php')).to.equal(command('./config.php'));
        expect(command('./config&.php')).to.equal(command('./config\&.php'));
        expect(command('./config".php')).to.equal(command('./config\".php'));
        expect(command('./config 2.php')).to.equal(command('./config\ 2.php'));
    });
});
