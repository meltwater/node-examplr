import { PassThrough, Transform } from 'stream'

import pino, { pretty, stdSerializers } from 'pino'

const createTransform = ({crlf = false} = {}) => new Transform({
  transform (chunk, encoding, callback) {
    const eol = crlf ? '\r\n' : '\n'
    const data = JSON.parse(chunk.toString())
    const newData = {...data, ...data.err}
    this.push(Buffer.from(JSON.stringify(newData) + eol))
    callback()
  }
})

const createFilter = filter => new Transform({
  transform (chunk, encoding, callback) {
    const data = JSON.parse(chunk.toString())
    if (filter(data)) this.push(chunk)
    callback()
  }
})

const prettySerializers = {
  pid: () => null,
  hostname: () => null
}

export default ({
  outputMode,
  filter,
  serializers = {},
  ...options
}) => {
  const usePretty = outputMode === 'pretty'
  const prettyOpts = {forceColor: true}
  const localSerializers = usePretty ? prettySerializers : {}

  const pinoOpts = {
    ...options,
    serializers: {...stdSerializers, ...localSerializers, ...serializers}
  }

  const stream = createTransform(pinoOpts)
  const filterer = filter ? createFilter(filter) : new PassThrough()
  const formatter = usePretty ? pretty(prettyOpts) : new PassThrough()
  stream.pipe(filterer).pipe(formatter).pipe(process.stdout)
  return pino(pinoOpts, stream)
}
