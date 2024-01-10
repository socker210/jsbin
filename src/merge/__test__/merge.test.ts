import merge, { isObject } from '@/merge'

describe('isObject', () => {
  test('literal object만 true값을 반환한다', () => {
    class Cls {}

    const obj = {}
    const arr: Array<unknown> = []
    const fn = function () {}
    const fnArrow = () => {}
    const cls = Cls
    const instance = new Cls()

    expect(isObject(obj)).toBe(true)
    expect(isObject(arr)).toBe(false)
    expect(isObject(fn)).toBe(false)
    expect(isObject(fnArrow)).toBe(false)
    expect(isObject(cls)).toBe(false)
    expect(isObject(instance)).toBe(false)
  })
})

describe('merge', () => {
  test('target과 source가 Object일 경우, merge하고 값은 source를 우선순위둔다', () => {
    const target = {
      prop: {
        prop_a: 'prop_a',
        prop_c: 'prop_c',
        prop_2: {
          prop_2_a: 'prop_2_a',
          prop_2_c: 'prop_2_c',
        },
      },
    }

    const source = {
      prop: {
        prop_a: 'prop_a_from_source',
        prop_b: 'prop_b',
        prop_2: {
          prop_2_a: 'prop_2_a_from_source',
          prop_2_b: 'prop_2_b',
        },
        prop_3: {
          prop_3_a: 'prop_3_a',
        },
      },
    }

    expect(merge(target, source)).toEqual({
      prop: {
        prop_a: 'prop_a_from_source',
        prop_b: 'prop_b',
        prop_c: 'prop_c',
        prop_2: {
          prop_2_a: 'prop_2_a_from_source',
          prop_2_b: 'prop_2_b',
          prop_2_c: 'prop_2_c',
        },
        prop_3: {
          prop_3_a: 'prop_3_a',
        },
      },
    })
  })

  test('source가 Object가 아닐 경우, source를 우선순위둔다', () => {
    const target = {
      prop: {
        prop_a: 'prop_a',
      },
    }

    const source = {
      prop: 'source',
    }

    const res = merge(target, source)

    expect(res).toEqual({ prop: 'source' })
  })
})
