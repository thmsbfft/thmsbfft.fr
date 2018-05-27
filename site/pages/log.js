const html = require('choo/html')
const css = require('sheetify')

// templates
const image = require('../templates/image.js')
const placeholder = require('../templates/placeholder.js')

const style = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-items: space-between;
  }
` 

module.exports = function (state, emit) {
  return html`
    <section class="${style}">
      ${state.manifest.images.map(image)}
    </section>
  `
}