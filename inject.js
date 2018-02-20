const createContainer = () => {
  const e = document.createElement('div')
  e.setAttribute('class', 'tfex-cont')
  return e;
}

const createPlayer = id => {
  const e = document.createElement('iframe')
  e.setAttribute('src', `https://www.youtube.com/embed/${id}`)
  e.setAttribute('frameborder', 0)
  e.setAttribute('allow', 'autoplay; encrypted-media')
  e.setAttribute('allowfullscreen', '')
  return e;
}

// main
const c = createContainer();
const p = createPlayer('6lKqPuO6N2U');
c.appendChild(p)
document.body.appendChild(c)