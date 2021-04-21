import {$} from '../../core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const index = $parent.data.index
  const type = $resizer.data.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value

  $resizer.css({
    opacity: 1,
    [sideProp]: '-2000px'
  })
  if (type === 'col') {
    document.onmousemove = e => {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    }
  } else {
    document.onmousemove = e => {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root.findAll(`[data-index="${index}"]`).forEach(col =>
        col.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
  }
}