import test from 'ava'

import createExamples from './examples.js'

test('creates examples', async (t) => {
  const { createExample, runExample } = createExamples()
  t.truthy(createExample)
  t.truthy(runExample)
})
