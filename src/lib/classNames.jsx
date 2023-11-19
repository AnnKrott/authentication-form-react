export function classNames(mainClass, mods = {}) {
  return [
    mainClass,
    ...Object.entries(mods)
      .filter(([key, value]) => Boolean(value))
      .map(([key]) => key)
  ]
    .join(' ')
}