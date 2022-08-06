import { request } from 'https'
import { API_OPTIONS } from './consts'

/** Recursively calls the 'next' link until all items retrieved
 * @param {string} url - URL to retrieve next page of items
*/
export const recurseNext = async (url) => {
  const resp = await requestAsync(url, API_OPTIONS())
  const items = resp.data.items
  if (resp.data._links.next) {
    const moreItems = await recurseNext(resp.data._links.next)
    return [ ...items, ...moreItems ]
  } else {
    return items
  }
}

/**
 * Async https request
 * @param { string } url the URL path
 * @param { any } options see Node.js docs for full details https://nodejs.org/api/http.html#http_http_request_url_options_callback
 * @param { string | object | undefined } body data to send in body of request
 * @returns { Promise<{ satusCode: number; data: string}>} A response object with status and any returned data
 */
export const requestAsync = async (url, options, body) => {
  return new Promise((resolve, reject) => {
    try {
      // Create a request
      const req = request(url, options, (res) => {
        // Concatenate all retrieved data
        let data = ''
        res.on('data', (chunk) => {
          data += chunk;
        })
        // Return on close
        res.on('close', () => {
          resolve({
            statusCode: res.statusCode,
            data: JSON.parse(data)
          })
        })
      })

      // Subscribe to error messages
      req.on('error', (err) => {
        reject(err)
      })

      // Include any body content
      if (typeof body === 'string') {
        req.write(body)
      }
      else if (typeof body !== 'undefined') {
        req.write(JSON.stringify(body))
      }

      // Complete configuration / initiate request 
      req.end()
    } catch (err) {
      reject(err)
    }
  })
}