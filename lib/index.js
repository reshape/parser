const {SAXParser} = require('parse5')

const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']

module.exports = function ReshapeParser (input, options = {}) {
  const stack = []
  const result = []
  const parser = new SAXParser({ locationInfo: true })

  parser.on('doctype', (name, pid, sid, location) => {
    let tag = `<!DOCTYPE ${name}`
    if (pid) { tag += ` PUBLIC "${pid}"` }
    if (sid) { tag += ` "${sid}"` }
    tag += '>'

    const node = { type: 'text', content: tag }
    addLocation(node, location, options)

    result.push(node)
  })

  parser.on('startTag', (name, attrs, selfClosing, location) => {
    const node = { type: 'tag', name: name }
    addLocation(node, location, options)

    if (attrs.length) {
      node.attrs = processAttrs(attrs, location.attrs, options)
    }

    if (selfClosing || voidElements.indexOf(name) > -1) {
      pushResult(stack, result, node)
    } else {
      stack.push(node)
    }
  })

  parser.on('endTag', (name) => {
    const node = stack.pop()
    if (!stack.length) { result.push(node); return }
    pushResult(stack, result, node)
  })

  parser.on('text', (content, location) => {
    const node = { type: 'text', content: content }
    addLocation(node, location, options)
    pushResult(stack, result, node)
  })

  parser.on('comment', (content, location) => {
    const node = { type: 'comment', content: content }
    addLocation(node, location, options)
    pushResult(stack, result, node)
  })

  parser.end(input)
  return result
}

function processAttrs (attrs, location, options) {
  return attrs.reduce((m, attr) => {
    const node = { type: 'text', content: attr.value }
    let propName = ''
    if (attr.prefix && attr.prefix.length) propName += `${attr.prefix}:`
    propName += attr.name.toLowerCase()
    addLocation(node, location[propName], options)
    m[attr.name] = [node]
    return m
  }, {})
}

function pushResult (stack, result, node) {
  const last = stack[stack.length - 1]
  if (!last) { result.push(node); return }
  if (!last.content) { last.content = [] }
  last.content.push(node)
}

function addLocation (node, loc, options) {
  node.location = { line: loc.line, col: loc.col }
  if (options.filename) { node.location.filename = options.filename }
}
