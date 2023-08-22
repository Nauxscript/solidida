import { groupByKey } from '..'

describe('Util test', () => {
  describe('Function: groupByKey', () => {
    test('groupByKey: should group by specific key', () => {
      const data = [
        {
          key: 1,
        }, {
          key: 2,
        }, {
          key: 2,
        }, {
          key: 3,
        },
      ]
      const result = groupByKey(data, 'key')
      const item = result[1] as Array<any>
      expect(result.length).toBe(3)
      expect(item.length).toBe(2)
      expect(item[1].key).toBe(2)
    })

    test('groupByKey: return data format depends on groupFn', () => {
      const data = [
        {
          key: 1,
        }, {
          key: 2,
        }, {
          key: 2,
        }, {
          key: 3,
        },
      ]
      const result = groupByKey(data, 'key', {
        groupFn: (key, group) => ({
          key,
          children: group,
        }),
      }) as { key: string; children: any[] }[]
      const item = result[1]
      expect(result.length).toBe(3)
      expect(item.children.length).toBe(2)
      expect(item.children[1].key).toBe(2)
    })
  })
})
