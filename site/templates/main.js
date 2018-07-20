const html = require('choo/html')
const css = require('sheetify')

const Gallery = require('../templates/gallery.js')

// styles
const body = require('../style/index.js')
const black = css`
  :host {

  }
`

// templates
const header = require('./header.js')

module.exports = function (state, emit) {
  var page = state.params.page
  if (state.params.page === undefined) page = ''

  emit('update-nav', page)
  
  var title = 't / ' + (page == '/' ? '' : page)
  if (state.title !== title) emit('DOMTitleChange', 't / ' + (page == '/' ? '' : page))

  switch (page) {
    case '':
      page = require('../pages/home.js')
      break
    case 'log':
      page = require('../pages/log.js')
      break
    default:
      page = require('../pages/404.js')
  }

  // ${state.cache(Gallery, 'gallery').render(state)}

  return html`
    <body class="${body}">
      ${page(state, emit)}
    </body>`

}