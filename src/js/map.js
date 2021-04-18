import L from 'leaflet'

import data from '../data/data.json'

export default class LeafletMap {

  constructor() {
    this.markers = data.markers.map(marker => this.getMarker(marker))
    this.images = data.images.map(image => this.getImage(image))
    this.polygons = data.polygons.map(polygon => this.getPolygon(polygon))
    this.polylines = data.polylines.map(polyline => this.getPolyline(polyline))
    this.standardZoom = 18
  }

  render(domElement) {
    this.map = L.map(domElement, {
      scrollWheelZoom: true,
      center: [40.44407,-8.08897],
      zoomDelta: 0.5,
      zoom: this.standardZoom,
      minZoom: 17,
      maxZoom: 19
    })

    if (process.env.NODE_ENV === 'development') {
      this.map.on('click', event => console.log(event.latlng.toString()))
      const osmUrl = `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.webp?sku=1019LN9R8ZICO&access_token=${process.env.MAPBOX_API_KEY}`
      const osmAttrib='<a href="https://www.mapbox.com/about/maps/">© Mapbox</a> <a href="http://www.openstreetmap.org/about/">© OpenStreetMap</a> <a href="https://www.maxar.com/">© Maxar</a>'
      const osm = new L.TileLayer(osmUrl, { minZoom: 3, maxZoom: 18, attribution: osmAttrib })
      osm.addTo(this.map)
    }

    this.images.map(image => image.addTo(this.map))
    this.polygons.map(polygon => polygon.addTo(this.map))
    this.polylines.map(polylines => polylines.addTo(this.map))
    this.markers.map(marker => marker.addTo(this.map))

    setTimeout(() => {
      this.map.invalidateSize()
    }, 0)
  }

  getMarker({ center, src, size }) {
    const [width, height] = size
    return L.marker(
      center,
      {
        icon: L.icon({
          iconUrl: src,
          iconSize: [width, height]
        })
      }
    )
  }

  getImage({ src, topLeft, bottomRight, options }) {
    return L.imageOverlay(
      src,
      [topLeft, bottomRight],
      options
    )
  }

  getPolygon({ latlngs, options }) {
    return L.polygon(latlngs, options)
  }

  getPolyline({ latlngs, options }) {
    return L.polyline(latlngs, options)
  }
}
