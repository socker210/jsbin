export const isObject = (obj: unknown) => {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    obj.constructor === Object &&
    obj.toString() === '[object Object]'
  )
}

const merge = <
  O1 extends Record<string, unknown>,
  O2 extends Record<string, unknown>,
>(
  o1: O1,
  o2: O2
) => {
  const res = {} as Record<string, unknown>

  const keys = Array.from(new Set(Object.keys(o1).concat(Object.keys(o2))))
  for (const key of keys) {
    if (isObject(o1[key as keyof O1]) && isObject(o2[key as keyof O2])) {
      res[key] = merge(o1[key] as O1, o2[key] as O2)
    } else {
      res[key] = o2[key] ?? o1[key]
    }
  }

  return res
}

export default merge
