# Examplr: Node.js Example Runner

[![npm](https://img.shields.io/npm/v/@meltwater/examplr.svg)](https://www.npmjs.com/package/@meltwater/examplr)
[![CircleCI](https://img.shields.io/circleci/project/github/meltwater/node-examplr/master.svg)](https://circleci.com/gh/meltwater/node-examplr)

Because all packages should have an `examples` folder
(including this one).

## Description

Examplr is a lightweight tool for adding examples to your project.
Write the smallest amount of code possible
to demonstrate the critical elements of your module:
the configuration, the input, and the output.

Examplr handles configuration options,
simple arguments, log output, and process execution.
Examples can be async functions or return promises.
Errors and rejections are handled and logged correctly.

Here's what an example for getting a user with an API client might look like

```js
import createClient from '../lib'

export default ({apiKey, reqId, log}) => async (userId = 'user-id') => {
  const client = createClient({apiKey, reqId, log})
  const { name } = await client.getUserById(userId)
  return name
}
```

Run with Examplr, some convenient magic happens:
the API key is automatically passed in as an option,
either from the environment variable `API_KEY`
or from a local JSON file (ignored by version control);
the user id can be passed in as an argument from the command line;
a Pino logger is created with colorized formatting;
and the user name is fetched asynchronously and logged.

### Try it out

Clone this and run the included example,
then copy the [`examples` folder](./examples) into your own project
to get started.

```
$ git clone git@github.com:meltwater/node-examplr.git
$ cd node-examplr
$ yarn
$ yarn example adventure
$ yarn example adventure Jake 28
```

[![asciicast](./demo.gif)](https://asciinema.org/a/23ee3BUtdw2Yppg0PkIspPiOf)

## Installation

Add this as a development dependency to your project using [npm] with

```
$ npm install --dev @meltwater/examplr
```

or using [Yarn] with

```
$ yarn add --save-dev @meltwater/examplr
```

[npm]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/

## Usage

Refer to the [`examples` folder](./examples) for working examples
and additional instructions you can copy directly into your project.

### Getting started

Create an entry point for examples,

```js
/* examples/index.js */

import path from 'path'

import { createExamples } from '@meltwater/examplr'

// Normally examples are imported from other files:
// add this one here for demonstration.
const adventureTime = ({
  friends,
  log
}) => (me = 'Finn') => {
  log.info({friends}, 'Ready')
  return `${me}, Jake, and ${friends}.`
}

const { runExample } = createExamples({
  examples: {adventureTime},
  envVars: ['FRIENDS', 'LOG_LEVEL', 'LOG_OUTPUT_MODE'],
  defaultOptions: {
    logLevel: 'info',
    logOutputMode: 'short',
    friends: 'Lumpy Space Princess'
  }
})

runExample({
  local: path.resolve('examples', 'local.json')
})
```

This can now be run with custom arguments with

```
$ node ./examples adventure-time Snail
```

Add any of the following to your project's npm scripts to enable
running with `npm run example` or `yarn run example`, etc.,

```json
{
  "scripts": {
    "example": "node examples",
    "example:watch": "nodemon examples",
    "example:inspect": "node --inspect examples",
    "example:inspect:watch": "nodemon --inspect examples",
  }
}
```

### Example functions

- Examples are higher order functions which take an options object and
  return either a synchronous function, an async function,
  or a function which returns a promise.
- The returned function will be called with any command line arguments.
- The return value or resolution value will be logged under `data`.
- If an error is thrown or the promise is rejected,
  the error will be logged under `err`.
- The **process will exit** after the function returns or throws,
  or the promise resolves or rejects.
    - To use callback style modules wrap them in a promise.
    - To run background processes, return a promise that does not resolve.

### Example options

All examples are passed a single argument containing the logger and all options.
This argument will always at least contain the logger as the `log` property.

- Available options are defined by listing the corresponding
  environment variables in `envVars`.
- Each environment variable name will be converted to camelcase and
  added with its value to the options object.
- The optional `local` option in `runExample` points to a JSON file
  to read and merge with the options (if this file exists).
- The `defaultOptions` are used to set default values for any undefined options.
- The option priority follows:
  environment variables override local JSON values override defaults.

### Logger

The logger is a [Pino] logger.

- Any custom `serializers` are used in addition to the standard serializers.
- Each filter in `logFilters` should be a function that takes the
  JSON log document and returns true if the log should be printed
  and false otherwise.
- The options `LOG_LEVEL`, `LOG_OUTPUT_MODE` and `LOG_FILTER` are built in,
  but must be enabled by adding them to the `envVars` array.
- The `logLevel` may be any supported Pino level.
- The `logFilter` is a property name in `logFilters` (no filter by default).
- The `logOutputMode` may be either `json` (unformatted),
  `pretty` (the Pino pretty formatter),
  or any mode supported by [bunyan-formatter]:
  `short` (default), `long`, `simple`, or `bunyan`.

### API Reference

#### `createExamples({examples, envVars, defaultOptions, createLogger})`

Takes a single options argument with the following parameters
and returns the object `{runExample}`.
All options are optional.

- `examples`: Object of examples to register.
- `envVars`: Array of environment variables to read into options.
- `defaultOptions`: Object of default options to pass to examples.
- `logSerializers`: Log `serializers` to pass to `createLogger`.
- `logFilters`: Object of named log filters (available via `logFilter`).
- `createLogger`: Custom function to use for creating the logger.

---
#### `runExample({local})`

Run the example with the provided command line arguments.
Gets the name of the example to run as the first CLI argument
and passes the rest to the example.
If no example is given, lists available examples.

The optional `local` option is the path to a config file
to read for example options (if it exists).

---
#### `getPinoArgs({outputMode, outputFilter, serializers, ...options})`

**Only use this method in development.**

This is a convenience method for users of this package who use
Pino in development outside of their examples
and want logging output formatted consistently.

The Pino output stream will be directed though the selected
formatter, thus logs will be pretty-printed
without needing to pipe them though the Pino CLI.

Returns the arguments (as an array) that are passed to the `pino`
instantiation function, e.g.,

```js
import pino from 'pino'

import { getPinoArgs } from '@meltwater/examplr'

const args = getPinoArgs({
  outputMode: 'short',
  outputFilter: log => log.foo === 'bar',
  serializers: {foo: x => x.toLowerCase()},
  // addtional options are passed to pino
})

const log = pino(...args)
```

[bunyan-formatter]: https://www.npmjs.com/package/bunyan-formatter
[Pino]: https://github.com/pinojs/pino

## Development Quickstart

```
$ git clone https://github.com/meltwater/node-examplr.git
$ cd node-examplr
$ nvm install
$ yarn
```

Run each command below in a separate terminal window:

```
$ yarn run watch
$ yarn run test:watch
```

## Development and Testing

### Source code

The [node-examplr source] is hosted on GitHub.
Clone the project with

```
$ git clone git@github.com:meltwater/node-examplr.git
```

[node-examplr source]: https://github.com/meltwater/node-examplr

### Requirements

You will need [Node.js] with [npm], [Yarn],
and a [Node.js debugging] client.

Be sure that all commands run under the correct Node version, e.g.,
if using [nvm], install the correct version with

```
$ nvm install
```

Set the active version for each shell session with

```
$ nvm use
```

Install the development dependencies with

```
$ yarn
```

[Node.js]: https://nodejs.org/
[Node.js debugging]: https://nodejs.org/en/docs/guides/debugging-getting-started/
[npm]: https://www.npmjs.com/
[nvm]: https://github.com/creationix/nvm

#### CircleCI

_CircleCI should already be configured: this section is for reference only._

The following environment variables must be set on [CircleCI]:

- `NPM_TOKEN`: npm token for installing and publishing packages.
- `NPM_TEAM`: npm team to grant read-only package access
  (format `org:team`, optional).

These may be set manually or by running the script `./.circleci/envvars.sh`.

[CircleCI]: https://circleci.com/

### Development tasks

Primary development tasks are defined under `scripts` in `package.json`
and available via `yarn run`.
View them with

```
$ yarn run
```

#### Production build

Lint, test, and transpile the production build to `dist` with

```
$ yarn run dist
```

##### Publishing a new release

Release a new version using [`npm version`][npm version].
This will run all tests, update the version number,
create and push a tagged commit,
and trigger CircleCI to publish the new version to npm.

- **Update the CHANGELOG before each new release after version 1.**
- New versions are released when the commit message is a valid version number.
- Versions are only published on release branches:
  `master` branch or any branch matching `ver/*`.
- If branch protection options are enabled,
  you must first run `npm version` on a separate branch,
  wait for the commit to pass any required checks,
  then merge and push the changes to a release branch.
- **Do not use the GitHub pull request button to merge version commits**
  as the commit tagged with the new version number will not match after merging.

[npm version]: https://docs.npmjs.com/cli/version

#### Examples

**See the [full documentation on using examples](./examples).**

View all examples with

```
$ yarn run example
```

#### Linting

Linting against the [JavaScript Standard Style] and [JSON Lint]
is handled by [gulp].

View available commands with

```
$ yarn run gulp --tasks
```

Run all linters with

```
$ yarn run lint
```

In a separate window, use gulp to watch for changes
and lint JavaScript and JSON files with

```
$ yarn run watch
```

Automatically fix most JavaScript formatting errors with

```
$ yarn run format
```

[gulp]: https://gulpjs.com/
[JavaScript Standard Style]: https://standardjs.com/
[JSON Lint]: https://github.com/zaach/jsonlint

#### Tests

Unit and integration testing is handled by [AVA]
and coverage is reported by [Istanbul].

- Test files end in `.spec.js`.
- Unit tests are placed under `lib` alongside the tested module.
- Integration tests are placed in `test`.
- Static files used in tests are placed in `fixtures`.

Watch and run tests on changes with

```
$ yarn run test:watch
```

If using [AVA snapshot testing], update snapshots with

```
$ yarn run test:update
```

Generate a coverage report with

```
$ yarn run report
```

An HTML version will be saved in `coverage`.

##### Debugging tests

Create a breakpoint by adding the statement `debugger` to the test
and start a debug session with, e.g.,

```
$ yarn run test:inspect lib/examples.spec.js
```

Watch and restart the debugging session on changes with

```
$ yarn run test:inspect:watch lib/examples.spec.js
```

[AVA]: https://github.com/avajs/ava
[AVA snapshot testing]: https://github.com/avajs/ava#snapshot-testing
[Istanbul]: https://istanbul.js.org/

## Contributing

The author and active contributors may be found in `package.json`,

```
$ jq .author < package.json
$ jq .contributors < package.json
```

To submit a patch:

1. Request repository access by submitting a new issue.
2. Create your feature branch (`git checkout -b my-new-feature`).
3. Make changes and write tests.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin my-new-feature`).
6. Create a new Pull Request.

## License

This npm package is licensed under the MIT license.

## Warranty

This software is provided by the copyright holders and contributors "as is" and
any express or implied warranties, including, but not limited to, the implied
warranties of merchantability and fitness for a particular purpose are
disclaimed. In no event shall the copyright holder or contributors be liable for
any direct, indirect, incidental, special, exemplary, or consequential damages
(including, but not limited to, procurement of substitute goods or services;
loss of use, data, or profits; or business interruption) however caused and on
any theory of liability, whether in contract, strict liability, or tort
(including negligence or otherwise) arising in any way out of the use of this
software, even if advised of the possibility of such damage.
