import { PassThrough, Transform } from 'stream'

import bunyanFormatter from 'bunyan-formatter'
import pino, { pretty, stdSerializers } from 'pino'

const createPrettyTransform = ({ crlf = false } = {}) => new Transform({
  transform (chunk, encoding, callback) {
    const data = JSON.parse(chunk.toString())

    if (data.err) {
      const eol = crlf ? '\r\n' : '\n'
      const newData = { ...data, ...data.err }
      const newChunk = JSON.stringify(newData) + eol
      callback(null, Buffer.from(newChunk))
      return
    }

    callback(null, chunk)
  }
})

const createFilter = filter => new Transform({
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
  ...options
}) => {
  const useJson = outputMode === 'json'
  const usePretty = outputMode === 'pretty'
  const useBunyanFormatter = !useJson && !usePretty

  const prettyOpts = { forceColor: true }

  const pinoOpts = {
    ...(useBunyanFormatter ? { timestamp: pino.stdTimeFunctions.slowTime } : {}),
    serializers: {
      req: stdSerializers.req,
      res: stdSerializers.res,
      err: stdSerializers.err,
      ...serializers
    },
    ...options
  }

  const filter = outputFilter
    ? createFilter(outputFilter)
    : new PassThrough()

  const transform = usePretty
    ? createPrettyTransform()
    : new PassThrough()

  const format = usePretty
    ? pretty(prettyOpts)
    : new PassThrough()

  const stdout = useBunyanFormatter
    ? bunyanFormatter({ outputMode })
    : process.stdout

  filter.pipe(transform).pipe(format).pipe(stdout)

  return [pinoOpts, filter]
}

export default (...args) => pino(...getPinoArgs(...args))
