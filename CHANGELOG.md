# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [4.0.2] / 2018-01-31

### Changed

- Update to [makenew-node-lib] v4.3.0

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

[Unreleased]: https://github.com/meltwater/node-examplr/compare/v4.0.2...HEAD
[4.0.2]: https://github.com/meltwater/node-examplr/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/meltwater/node-examplr/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/meltwater/node-examplr/compare/v3.1.0...v4.0.0
[3.1.0]: https://github.com/meltwater/node-examplr/compare/v3.0.1...v3.1.0
[3.0.1]: https://github.com/meltwater/node-examplr/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/meltwater/node-examplr/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/meltwater/node-examplr/compare/v1.0.0...v2.0.0
