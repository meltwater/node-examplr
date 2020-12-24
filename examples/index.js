import path from 'path'

// If using in a real project, replace the line below with
// import { createExamples } from '@meltwater/examplr'
import { createExamples } from '../index.js'

import adventure from './adventure.js'

export const examples = {
  adventure
}

// prettier-ignore
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
