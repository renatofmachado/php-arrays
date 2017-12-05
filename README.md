# php-arrays

Parse PHP array-like configuration files into JavaScript objects.

Sometimes it is useful to share your PHP application configuration with, for example, your JavaScript build system. Let's say the application has a theme configuration key, instead of duplicating the same key in JavaScript configuration, this package allows to transform the PHP array-like configuration file into JSON.

## Quick Example

```php
<?php

return [
    'foo' => 'bar',
];
```

```js
let parser = require('php-arrays');

parser.parse('../path/to/file.php', (result) => {
    console.log(result); // { foo: "bar" }
}, (error) => {
    // Handle error..
});

let result = parser.parseSync('../path/to/file.php', (error) => {
    return 'this will be the value of the result variable if an error occurs.';
});
```

## Installing

Run `npm install oxy/php-arrays --save-dev`.

## API

### parse(file : string, callback : function, onError? : function)

The parse function parses the given file asynchronously. Whenever the parsing of the file is successful, the callback function will be triggered, otherwise, the optional onError function is called.

### parseSync(file : string, onError? : function)

The parseSync function parses the given file synchronously. If the parsing of the file provokes an error, the optional onError function is called. This function returns the PHP array as JSON or the value returned by the onError function.

### command(file : string)

This function allows to sanitize the file input and also generate the command to parse the file. Therefore, it returns the generated command.

## Contributing

If you happen to find an error, or you might be thinking about a general improvement to the project, please do create an Issue, or consider creating a Pull Request. All contributions are appreciated.
