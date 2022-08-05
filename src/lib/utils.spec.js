import nock from 'nock'
import { recurseNext } from './utilis'

describe('utils', () => {
  describe('recurseNext', () => {
    it('return list of values when no recursion necessary', async () => {
      // Arrange: single calls
      nock('https://stedi4gw.com')
      .get('/api/test1')
      .reply(200, {
        items: ['hello','world'],
        _links: {},
      })
      const expected = ['hello','world']
      // Act: Execute the function
      const list = await recurseNext('https://stedi4gw.com/api/test1')
      // Assert: Function has returned only the one set of values
      expect(list).toEqual(expected);
    })

    it('return list of values when recursive calls to next are necessary', async () => {
      // Arrange: multiple calls
      nock('https://stedi4gw.com')
      .get('/api/test1')
      .reply(200, {
        items: ['hello','world'],
        _links: {
          next: 'https://stedi4gw.com/api/test2',
        },
      })
      .get('/api/test2')
      .reply(200, {
        items: ['goodbye','cruel','world'],
        _links: {},
      })
      const expected = ['hello','world','goodbye','cruel','world']
      // Act: Execute the function
      const list = await recurseNext('https://stedi4gw.com/api/test1')
      // Assert: Function has combined all responses into single list
      expect(list).toEqual(expected);
    })
  })
})
