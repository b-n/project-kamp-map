import LeafletMap from './js/map'
import './sass/index.scss'

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('map')

  const map = new LeafletMap()
  map.render(mapElement)
})
