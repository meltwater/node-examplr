import test from 'ava'

import createExamples from './examples'

test('creates examples', async (t) => {
  const { createExample, runExample } = createExamples()
  t.truthy(createExample)
  t.truthy(runExample)
})
