# Project Kamp Map

Just a small map using leaflet to give the feel for the land.

## Configuration

To avoid writing a bunch of javascript, you should just be able to configure the file in `src/data/data.json`

Look at examples that are there, and you should be able to just add new things. Images should go in the public/images folders.

It might be easier to configure the data.json by using development mode below (click for GPS, satellite overlay etc)

## Developing

Should be as easy as:

```
yarn install
yarn run start
```

If you want to see maps (and not errors) whilst developing, then you should add the following in a .env:

```shell
MAPBOX_API_KEY=<your public mapbox api key
```

### Data

This thing is mostly built just to make the Leaflet stuff more accessible from a addition/edit perspective. As such, most
of the options for different elements in leaflet are available in the `src/data/data.json` file.

Structure is a little something like this:

```json
{
  "markers": [],
  "images": [],
  "polygons": [],
  "polylines": [],
}
```

#### `markers`

```json
{
  "center": [lat, lng],
  "iconOptions": "<Leaflet.Icon options>",
  "options": "<Leaflet.Marker options>",
  "popupContent": "Some html goes here"
}
```

Links:

- [Leaflet.Icon](https://leafletjs.com/reference-1.7.1.html#icon)
- [Leaflet.Marker](https://leafletjs.com/reference-1.7.1.html#marker)

#### `images`

```json
{
  "src": "<relative path from public folder>``",
  "topLeft": [lat, lng],
  "bottomRight": [lat, lng],
  "options": "<Leaflet.ImageOverlay options>",
  "popupContent": "Some html goes here"
}
```

Links:

- [Leaflet.ImageOverlay](https://leafletjs.com/reference-1.7.1.html#imageoverlay)


#### `polygons` || `polylines`

```json
{
  "latlngs": [[lat, lng]],
  "options": "<Leaflet.Polygon options>",
  "popupContent": "Some html goes here"
}
```

Links:

- [Leaflet.ImageOverlay](https://leafletjs.com/reference-1.7.1.html#imageoverlay)

Note: Yes an array of lat lngs [[0,1], [1,0]]

## Building

Production builds are built on deployed when commited to main. If you want to inspect a build before it gets there you can:

```
yarn run build
```

The output should be in `./build`, and in theory you should be able to just open index.html in any browser

## Notes

This repo uses yarn berry with pnp and zero installs. All those words might mean something to you, they might not. Either way
dependencies are included with the git repo, so your first download might take some time, but every subsequent pull you probably
won't even need to `yarn install` anymore. Woo!

You might need to install yarn though of course `npm install -g yarn`
