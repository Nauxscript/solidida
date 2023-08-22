import { groupByKey } from '..'

describe('Util test', () => {
  describe('Function: groupByKey', () => {
    const targetData = [
      {
        key: 1,
        value: 'yes',
      }, {
        key: 2,
        value: 'no',
      }, {
        key: 2,
        value: 'damn',
      }, {
        key: 3,
        value: 'damn',
      },
    ]
    test('groupByKey: should group by specific key', () => {
      const result = groupByKey(targetData, 'key') as any[]
      const item = result[1] as Array<any>
      expect(result.length).toBe(3)
      expect(item.length).toBe(2)
      expect(item[1].key).toBe(2)
    })

    test('groupByKey: return data format depends on groupFn', () => {
      const result = groupByKey(targetData, 'key', 'Array', {
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

    test('groupByKey: filter target by filterFn', () => {
      const result = groupByKey(targetData, 'key', 'Array', {
        groupFn: (key, group) => ({
          key,
          children: group,
        }),
        filter: item => item.value !== 'damn',
      }) as { key: string; children: any[] }[]
      const item = result[1]
      expect(result.length).toBe(2)
      expect(item.children.length).toBe(1)
    })

    test('groupByKey: should return Map data', () => {
      const result = groupByKey(targetData, 'key', 'Map', {
        groupFn: (key, group) => ({
          key,
          children: group,
        }),
      }) as Map<number, typeof targetData>
      expect(result.get(1)?.length).toBe(1)
      expect(result.get(2)?.length).toBe(2)
      expect(result.get(3)?.length).toBe(1)
    })
  })
})
