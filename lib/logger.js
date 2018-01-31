import { PassThrough, Transform } from 'stream'

import pino, { pretty, stdSerializers } from 'pino'

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

  const opts = {
    ...options,
    serializers: {...stdSerializers, ...localSerializers, ...serializers}
  }

  if (!filter) {
    return pino({...opts, prettyPrint: usePretty ? prettyOpts : false})
  }

  const stream = createFilter(filter)
  const formatter = usePretty ? pretty(prettyOpts) : new PassThrough()
  stream.pipe(formatter).pipe(process.stdout)
  return pino(opts, stream)
}
