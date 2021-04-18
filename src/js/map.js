import L from 'leaflet'
import './lib/lwsu/leaflet-polygon-fillPattern/leaflet-polygon.fillPattern'

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
      this.map.on('click', event => this.addDebugMarker(event))
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

  addDebugMarker(event) {
    if (!this.debugMarkers) { this.debugMarkers = [] }
    const marker = this.getMarker({
      center: event.latlng,
      iconOptions: { iconUrl: "images/x.png", iconSize: [32, 32] },
      options: { draggable: true, title: '' + this.debugMarkers.length }
    })
    marker.on('dragend', () => this.logDebugMarkerPositions())
    marker.addTo(this.map)
    this.debugMarkers.push(marker)
    this.logDebugMarkerPositions()
  }

  logDebugMarkerPositions() {
    const markerPositions = this.debugMarkers.map(marker => { const loc = marker.getLatLng(); return [loc.lat, loc.lng] })

    console.log(JSON.stringify(markerPositions))
  }

  getMarker({ center, iconOptions, options }) {
    return L.marker(
      center,
      {
        ...options,
        icon: L.icon(iconOptions)
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
