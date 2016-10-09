import Firebase from 'firebase'
import LRU from 'lru-cache'

const inBrowser = typeof window !== 'undefined'

// When using bundleRenderer, the server-side application code runs in a new
// context for each request. To allow caching across multiple requests, we need
// to attach the cache to the process which is shared across all requests.
const cache = inBrowser
  ? null
  : (process.__API_CACHE__ || (process.__API_CACHE__ = createCache()))

function createCache () {
  return LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })
}

// create a single api instance for all server-side requests
const api = inBrowser
  ? new Firebase('https://travlr-1367.firebaseio.com')
  : (process.__API__ || (process.__API__ = createServerSideAPI()))

function createServerSideAPI () {
  const api = new Firebase('https://travlr-1367.firebaseio.com')

  // Warmup
  getAllTravels()

  return api
}

function fetch (child) {
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

export function getTravel (slug) {
  return fetch(`travels/${slug}`)
}

export function getAllTravels () {
  return fetch(`travels`);
}

export function watchTravelList (cb) {
  let first = true

  const ref = api.child('travels')
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }

  ref.on('value', handler)

  return () => {
    ref.off('value', handler)
  }
}
