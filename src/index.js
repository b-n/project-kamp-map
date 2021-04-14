import LeafletMap from './js/map'
import './sass/index.scss'

document.addEventListener('DOMContentLoaded', () => {
  if (!window.Promise) {
    window.Promise = Promise
  }

  const mapElement = document.getElementById('map')

  const map = new LeafletMap()
  map.render(mapElement)
})
