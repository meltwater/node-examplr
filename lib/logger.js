import { PassThrough, Transform } from 'stream'

import pino, { pretty, stdSerializers } from 'pino'

const createFilter = filter => new Transform({
  transform (chunk, encoding, callback) {
    const data = JSON.parse(chunk.toString())
    if (filter(data)) this.push(chunk)
    callback()
  }
})

export default ({
  outputMode,
  filter,
  serializers = {},
  ...options
}) => {
  const usePretty = outputMode === 'pretty'
  const prettyOpts = {forceColor: true}

  const opts = {
    ...options,
    serializers: {...stdSerializers, ...serializers}
  }

  if (!filter) {
    return pino({...opts, prettyPrint: usePretty ? prettyOpts : false})
  }

  const stream = createFilter(filter)
  const formatter = usePretty ? pretty(prettyOpts) : new PassThrough()
  stream.pipe(formatter).pipe(process.stdout)
  return pino(opts, stream)
}
