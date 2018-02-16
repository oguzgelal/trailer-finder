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

// Find trailer button clicked
const init = (selectionText) => {
  loadEnvFile().then(() => {
    console.log(env);
    alert(selectionText)
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

