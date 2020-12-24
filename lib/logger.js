import { PassThrough, Transform } from 'stream'

import bunyanFormatter from 'bunyan-formatter'
import pino from 'pino'
import pinoPretty from 'pino-pretty'

const { stdSerializers } = pino

const slowTime = () => ',"time":"' + new Date().toISOString() + '"'

const createPrettyTransform = ({ crlf = false, pretty } = {}) =>
  new Transform({
    transform (chunk, encoding, callback) {
      const data = pretty(chunk.toString())
      callback(null, data)
    }
  })

const createFilter = (filter) =>
  new Transform({
    transform (chunk, encoding, callback) {
      const data = JSON.parse(chunk.toString())
      if (filter(data)) this.push(chunk)
      callback()
    }
  })

export const getPinoArgs = ({
  outputMode = 'short',
  outputFilter,
  serializers = {},
  prettyPrint = {},
  ...options
}) => {
  const useJson = outputMode === 'json'
  const usePretty = outputMode === 'pretty'
  const useBunyanFormatter = !useJson && !usePretty

  const pretty = pinoPretty({
    forceColor: true,
    ...prettyPrint
  })

  const pinoOpts = {
    ...(useBunyanFormatter ? { timestamp: slowTime } : {}),
    serializers: {
      req: stdSerializers.req,
      res: stdSerializers.res,
      err: stdSerializers.err,
      ...serializers
    },
    ...options
  }

  const filter = outputFilter ? createFilter(outputFilter) : new PassThrough()

  const format = usePretty
    ? createPrettyTransform({ pretty })
    : new PassThrough()

  const stdout = useBunyanFormatter
    ? bunyanFormatter({ outputMode })
    : process.stdout

  filter.pipe(format).pipe(stdout)

  return [pinoOpts, filter]
}

export default (...args) => pino(...getPinoArgs(...args))
