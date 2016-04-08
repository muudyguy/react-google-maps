# react-google-maps
Google maps for react

This is a google-maps react component that provides simple means to integrate google maps into your reactjs site.
It removes the hustle of initialization and boilerplate code.

##How to install##

npm install logicaleak-react-google-maps

##How to use##

GoogleMaps component has a lot of components to utilise. They are typically passed by the state variables of 
the wrapping component. When a state variables is changed, the present elements in the map will be deleted, and the new elements
will be inserted. The map will not be refreshed or loaded again.

```javascript
<GoogleMaps 
    richMarkers={this.state.markers} 
    polygons={this.state.polygons} 
    polylines={this.state.polylines}
    arrows={this.state.arrows} 
    center={this.state.center} 
    zoom={this.state.zoom} 
    mapTypeControl={this.state.mapTypeControl} 
    elId="mapId" 
    googleMapsClassName="googleMaps"    
    direction={this.state.direction}
    onDirectionCalculatedPolylineMode={this._onDirectionCalculated}
    onClick={this._onClick}
    onRightClick={this._onRightClick}
/>
```

### Rich Markers ###
GoogleMaps component internally uses an open source marker project which can be found in github at the following link :

https://github.com/googlemaps/js-rich-marker

As this component was created while developing tools for GIS operations, dynamic markers which can clearly indicate its purpose was 
very necessary, hence rich-markers were integrated into it.

Rich markers can be used with property "richMarkers". The typical object that should be passed into it is like :

```javascript
[
  {
      content: '<div class="markerTextDiv">Start</div>',
      coordinates : {lat:40.0, lng:40.0}
  }
]
```
You can use anything for content. Each marker in the list will be inserted to the map. But beware, existing ones will be removed forever.
