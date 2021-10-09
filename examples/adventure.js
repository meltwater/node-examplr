const getLevel = () => Math.floor(10 * Math.random())

export default ({ minLevel, reqId, log }) => async (
  adventurer = 'Finn',
  age = 12
) => {
  log.info({ adventurer, age }, 'Ready for adventure!')

  const level = await new Promise((resolve) => {
    setTimeout(() => resolve(getLevel()), 1000)
  })

  if (level < minLevel) throw new Error('Level too low.')

  return { adventurer, age, level }
}
