import fs from 'fs'

import { createLogger as createBunyan, stdSerializers } from 'bunyan'
import bunyanFormatter from 'bunyan-formatter'
import { camelCase, paramCase } from 'change-case'

const createDefaultLogger = ({serializers, ...options}) => createBunyan({
  serializers: {err: stdSerializers.err, ...serializers},
  ...options
})

export default ({
  examples = {},
  envVars = [],
  defaultOptions = {},
  createLogger = createDefaultLogger
} = {}) => {
  const envOptions = env => Object.assign.apply({}, [{},
    ...envVars.filter(k => env[k] !== undefined)
    .map(k => ({[camelCase(k)]: env[k]}))]
  )

  const localOptions = local => fs.existsSync(local)
    ? {...defaultOptions, ...JSON.parse(fs.readFileSync(local))}
    : defaultOptions

  const createExample = (name, {
    log = createLogger({name}),
    ...options
  } = {}) => async (...args) => {
    try {
      if (!name) throw new Error('Must specify example name as first argument.')

      const example = examples[camelCase(name)]

      if (typeof example !== 'function') {
        throw new Error(`Example ${name} not found.`)
      }

      log.info('Example: Start')
      const data = await example({...options, log})(...args)
      log.info({data}, 'Example: Success')
      return data
    } catch (err) {
      log.error({err}, 'Example: Fail')
      throw err
    }
  }

  const runExample = ({local = 'local.json'}) => {
    const { name } = JSON.parse(fs.readFileSync('package.json'))
    const example = process.argv.slice(2)[0]
    const args = process.argv.slice(3)
    const options = {...localOptions(local), ...envOptions(process.env)}

    const level = options.logLevel || 'info'
    const outputMode = options.logOutputMode || 'short'
    const stream = bunyanFormatter({outputMode})
    const log = createLogger({name, example, level, stream})

    if (!example) {
      console.log()
      console.log('Runnable examples:')
      Object.keys(examples).sort().forEach(e => {
        console.log('  ', paramCase(e))
      })
      console.log()
      process.exit(0)
    }

    createExample(example, {...options, log})(...args).catch(() => {
      log.fatal('Example: Fatal')
      process.exit(1)
    })
  }

  return {
    createExample,
    runExample
  }
}
