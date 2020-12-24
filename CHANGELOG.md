# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/)
and this project adheres to [Semantic Versioning](https://semver.org/).

## [6.0.0] / 2020-12-24

### Added

- Publish as both ES and CommonJS module.

### Changed

- (**Breaking**) Use Conditional Exports to provide ES or CommonJS module.
  Cannot import or require internal paths.
- (**Breaking**) Drop support for Node.js versions before 12.13.0.

### Removed

- (**Breaking**) The `default` export.

## [5.0.1] / 2020-12-08

### Fixed

- Missing explicit exit with code 0.

## [5.0.0] / 2020-11-17

### Changed

- Update to pino v6 and pino-pretty v4.
- License to MIT.

## [4.3.0] / 2020-02-20

### Changed

- Update to pino-pretty v3.
- Update to change-case v4.

## [4.2.1] / 2018-12-17

### Changed

- Update to AVA v1 (along with other dependencies).
- Update CircleCI to test Node.js v10 LTS.

## [4.2.0] / 2018-09-26

### Changed

- Update to Pino v5.4.1.
- Update to [makenew-node-lib] v5.0.0.

## [4.1.6] / 2018-04-09

### Changed

- README documentation updated.

### Added

- When the log level is debug or higher,
  the options and arguments will be logged with the start message.

## [4.1.5] / 2018-04-09

### Changed

- Open source under the Apache License, Version 2.0.

### Added

- Examples in `examples` folder.
- Better documentation.

## [4.1.4] / 2018-03-29

### Fixed

- Explicitly use `req`, `res`, and `err` serializers
  to suppress pino warning.

### Changed

- Update to Pino to v4.15.3.

## [4.1.3] / 2018-02-12

### Changed

- Update to [makenew-node-lib] v4.3.6.

## [4.1.2] / 2018-02-01

### Fixed

- Example name not getting logged.

## [4.1.1] / 2018-01-31

### Fixed

- Log output mode was not defaulting to `short` in all cases.

## [4.1.0] / 2018-01-31

### Added

- All [bunyan-formatter] modes now supported again.
- Expose pino log arguments with `getPinoArgs`.

### Changed

- Use [bunyan-formatter] over Pino pretty to format log output by default.
- Update to [makenew-node-lib] v4.3.1.

## [4.0.2] / 2018-01-31

### Changed

- Update to [makenew-node-lib] v4.3.0.

## [4.0.1] / 2018-01-30

### Fixed

- Too much log output noise (removed hostname and pid).
- Error stack output display format.

## [4.0.0] / 2018-01-30

### Changed

- Replace Bunyan with [Pino]
  (non-breaking, but significant enough for a major version bump).
- The `logOutputMode` choices are now `json` or `pretty`.
- Update to [makenew-node-lib] v4.2.0.

### Added

- New `logSerializers` option to pass additional log serializers.
- New `logFilter` and `logFilters` options to support log filtering.

## [3.1.0] / 2018-01-15

### Changed

- Process will exit when example finishes.
- Update to [makenew-node-lib] v4.1.10.

## [3.0.1] / 2017-11-14

### Changed

- Update to [makenew-node-lib] v4.1.1.

## [3.0.0] / 2017-11-14

### Changed

- (**Breaking**) Build for Node.js LTS Carbon:
  drop support for Node versions less than 8.9.0.

## [2.0.0] / 2017-10-31

### Added

- (**Breaking**) Use [bunyan-formatter] to format log output.
  Control output mode with new `logOutputMode` option.

### Changed

- Update to [makenew-node-lib] v3.1.2.

## 1.0.0 / 2017-10-20

- Initial release.

[makenew-node-lib]: https://github.com/meltwater/makenew-node-lib
[bunyan-formatter]: https://www.npmjs.com/package/bunyan-formatter
[Pino]: https://github.com/pinojs/pino

[Unreleased]: https://github.com/meltwater/node-examplr/compare/v6.0.0...HEAD
[6.0.0]: https://github.com/meltwater/node-examplr/compare/v5.0.1...v6.0.0
[5.0.1]: https://github.com/meltwater/node-examplr/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/meltwater/node-examplr/compare/v4.3.0...v5.0.0
[4.3.0]: https://github.com/meltwater/node-examplr/compare/v4.2.1...v4.3.0
[4.2.1]: https://github.com/meltwater/node-examplr/compare/v4.2.0...v4.2.1
[4.2.0]: https://github.com/meltwater/node-examplr/compare/v4.1.6...v4.2.0
[4.1.6]: https://github.com/meltwater/node-examplr/compare/v4.1.5...v4.1.6
[4.1.5]: https://github.com/meltwater/node-examplr/compare/v4.1.4...v4.1.5
[4.1.4]: https://github.com/meltwater/node-examplr/compare/v4.1.3...v4.1.4
[4.1.3]: https://github.com/meltwater/node-examplr/compare/v4.1.2...v4.1.3
[4.1.2]: https://github.com/meltwater/node-examplr/compare/v4.1.1...v4.1.2
[4.1.1]: https://github.com/meltwater/node-examplr/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/meltwater/node-examplr/compare/v4.0.2...v4.1.0
[4.0.2]: https://github.com/meltwater/node-examplr/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/meltwater/node-examplr/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/meltwater/node-examplr/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/meltwater/node-examplr/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/meltwater/node-examplr/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/meltwater/node-examplr/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/meltwater/node-examplr/compare/v1.0.0...v2.0.0
