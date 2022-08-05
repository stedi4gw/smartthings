import axios from 'axios'
import { API_HEADERS } from './consts'

/** Recursively calls the 'next' link until all items retrieved
 * @param {string} url - URL to retrieve next page of items
*/
export const recurseNext = async (url) => {
  const resp = await axios.get(url, { headers: API_HEADERS() })
  const items = resp.data.items
  if (resp.data._links.next) {
    const moreItems = await recurseNext(resp.data._links.next)
    return [ ...items, ...moreItems ]
  } else {
    return items
  }
}
