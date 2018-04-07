import path from 'path'

import createExamples from '../lib'

import adventure from './adventure'

export const examples = {
  adventure
}

const envVars = [
  'MIN_LEVEL',
  'LOG_LEVEL',
  'LOG_FILTER',
  'LOG_OUTPUT_MODE'
]

const defaultOptions = {
  minLevel: 2
}

if (require.main === module) {
  const { runExample } = createExamples({
    examples,
    envVars,
    defaultOptions
  })

  runExample({
    local: path.resolve(__dirname, 'local.json')
  })
}
