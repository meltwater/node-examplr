import { PassThrough, Transform } from 'stream'

import bunyanFormatter from 'bunyan-formatter'
import pino, { stdSerializers } from 'pino'
import pinoPretty from 'pino-pretty'

const slowTime = () => ',"time":"' + new Date().toISOString() + '"'

const createFilter = (filter) =>
  new Transform({
    transform (chunk, encoding, callback) {
      try {
        const data = JSON.parse(chunk.toString())
        if (filter(data)) this.push(chunk)
        callback()
      } catch (err) {
        callback(err)
      }
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

  if (usePretty) {
    const pretty = pinoPretty({
      colorize: true,
      ...prettyPrint
    })

    return [pinoOpts, pretty]
  }

  const filter = outputFilter ? createFilter(outputFilter) : new PassThrough()

  const stdout = useBunyanFormatter
    ? bunyanFormatter({ outputMode })
    : process.stdout

  filter.pipe(stdout)

  return [pinoOpts, filter]
}

export default (...args) => pino(...getPinoArgs(...args))
