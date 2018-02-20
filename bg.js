let env = {};

// Load contents of env.json into global env object
const loadEnvFile = () => new Promise(resolve => {
  if (!env || Object.keys(env).length === 0) {
    fetch(chrome.runtime.getURL('env.json'))
      .then(res => res.json())
      .then(e => { env = e; })
      .then(resolve)
  } else {
    resolve();
  }
})

const search = (txt) =>
  new Promise((resolve, reject) => {
    const params = {
      key: env.YOUTUBE_API_KEY,
      type: 'video',
      part: 'id',
      q: txt,
    }

    const q = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')

    fetch(`${env.YOUTUBE_BASE}/search?${q}`)
      .then(res => res.json())
      .then(resolve)
      .catch(reject)
  })

// Find trailer button clicked
const init = (selectionText) => {
  loadEnvFile().then(() => {
    search(`${selectionText} trailer`).then(res => {
      if (res.items && res.items.length > 0){

      } else {
        // TODO
        console.log('No videos found');
      }
    })
  })
}

// Create context menu
chrome.contextMenus.create({
  id: 'trailer-find',
  title: 'Trailers for “%s”',
  contexts: ['selection'],
})

// Create click listener for the context menu
chrome.contextMenus.onClicked.addListener(({ selectionText }) => {
  init(selectionText)
})

