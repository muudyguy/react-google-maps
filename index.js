var React = require('react');
var GoogleMapsLoader = require('google-maps');
var style = require('./style.js');
var RichMarkerBuildFunction = require('./rich-markers');

var RichMarker;

var GoogleMaps = React.createClass({
	getDefaultProps: function() {
		return {
			arrows : [],
			polygons: [],
			markers: []
		};
	},

	getInitialState : function() {
		return {

		};
	},

	createRichMarkerObjects: function(richMarkers) {
		var that = this;

		var googleMapsRichMarkerObjects = [];
		richMarkers.forEach(function(richMarker) {
			console.log(richMarker);
			googleMapsRichMarkerObjects.push(new RichMarker({
				position: new that.google.maps.LatLng(richMarker.coordinates.lat, richMarker.coordinates.lng),
				content: richMarker.content
			}));
		});
		this.googleMapsRichMarkerObjects = googleMapsRichMarkerObjects;
	},

	setMapToRichMarkers: function(map) {
		this.googleMapsRichMarkerObjects.forEach(function(richMarker) {
			richMarker.setMap(map);
		});
	},

	updateRichMarkers: function(richMarkers) {
		
		
		if (this.googleMapsRichMarkerObjects !== undefined) {
			
			
			this.googleMapsRichMarkerObjects.forEach(function(richMarker) {
				richMarker.setMap(null);
			});
			//Create googleMapsArrowObjects again with new props
			this.createRichMarkerObjects(richMarkers);
			this.setMapToRichMarkers(this.map);	
		} else {
			
		}
	},

	createMarkerObjects: function(markers) {
		var that = this;
		var googleMapsMarkerObjects = [];
		markers.forEach(function(marker) {
			googleMapsMarkerObjects.push(new google.maps.Marker({
				position: marker.coordinates,
				label: marker.label,
				map: null

			}));
		});
		this.googleMapsMarkerObjects = googleMapsMarkerObjects;
	},

	setMapToMarkers: function(map) {
		this.googleMapsMarkerObjects.forEach(function(marker) {
			marker.setMap(map);
		});
	},

	updateMarkers: function(markers) {
		if (this.googleMapsMarkerObjects !== undefined) {
			this.googleMapsMarkerObjects.forEach(function(marker) {
				marker.setMap(null);
			});
			//Create googleMapsArrowObjects again with new props
			this.createMarkerObjects(markers);
			this.setMapToMarkers(this.map);	
		} else {
			
		}
	},

	createPolygonObjects : function(polygons) {
		var that = this;

		var googleMapsPolygonObjects = [];
		polygons.forEach(function(polygon) {
			// 
			googleMapsPolygonObjects.push(new google.maps.Polygon({
				strokeColor: polygon.color,
			    strokeOpacity: polygon.strokeOpacity,
			    strokeWeight: polygon.strokeWeight,
			    paths: polygon.coordinates,
			    fillColor: polygon.fillColor,
			    fillOpacity: polygon.fillOpacity
			}));
		});
		this.googleMapsPolygonObjects = googleMapsPolygonObjects;
	},

	setMapToPolygons : function(map) {
		this.googleMapsPolygonObjects.forEach(function(polygon) {
			polygon.setMap(map);
		});
	},

	updatePolygons : function(polygons) {
		if (this.googleMapsPolygonObjects !== undefined) {
			this.googleMapsPolygonObjects.forEach(function(polygon) {
				polygon.setMap(null);
			});
			//Create googleMapsArrowObjects again with new props
			this.createPolygonObjects(polygons);
			this.setMapToPolygons(this.map);	
		} else {
			
		}
	},

	createArrowObjects : function(arrows) {
		var that = this;

		var arrowSymbol = {
	    	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
	  	};

		var googleMapsArrowObjects = [];
		arrows.forEach(function(arrow) {
			
			googleMapsArrowObjects.push(new google.maps.Polyline({
				strokeColor: arrow.color,
			    strokeOpacity: arrow.strokeOpacity,
			    strokeWeight: arrow.strokeWeight,
				path : arrow.coordinates,
				icons : [
					{
						icon: arrowSymbol,
						offset : '100%'
					}
				],
				map: null
			}));
		});
		this.googleMapsArrowObjects = googleMapsArrowObjects;
	},

	setMapToArrows : function(map) {
		this.googleMapsArrowObjects.forEach(function(arrow) {
			arrow.setMap(map);
		});
	},

	updateArrows : function(arrows) {
		if (this.googleMapsArrowObjects !== undefined) {
			this.googleMapsArrowObjects.forEach(function(arrow) {
				arrow.setMap(null);
			});
			//Create googleMapsArrowObjects again with new props
			this.createArrowObjects(arrows);
			this.setMapToArrows(this.map);	
		} else {
			
		}
	},

	componentWillMount: function() {
		
	},

	componentDidMount : function() {
		var id = this.props.elId;
		
		var that = this;

		GoogleMapsLoader.load(function(google) {
			that.google = google;

			RichMarker = RichMarkerBuildFunction(google);
			
			var el = document.getElementById(id);
			var options = {
				zoom: that.props.zoom,
			    center: that.props.center,
			    mapTypeControl: that.props.mapTypeControl
			};
		    that.map = new google.maps.Map(el, options);

	    	// Set up arrows
	    	that.createArrowObjects(that.props.arrows);
		    that.setMapToArrows(that.map);

		    // Set up Polygons
		    that.createPolygonObjects(that.props.polygons);
		    that.setMapToPolygons(that.map);

		    // Set up markers
		    that.createMarkerObjects(that.props.markers);
		    that.setMapToMarkers(that.map);

	    	// Set up rich Markers
		    that.createRichMarkerObjects(that.props.richMarkers);
		    that.setMapToRichMarkers(that.map);
		});
	},

	componentWillReceiveProps : function(props) {

		
		
		this.updateArrows(props.arrows);
		this.updatePolygons(props.polygons);
		this.updateMarkers(props.markers);
		this.updateRichMarkers(props.richMarkers);

	},

	render : function() {
		var className = this.props.googleMapsClassName;

		return (
			<div className={className} id={this.props.elId}>

			</div>
		);
	}
});

module.exports = GoogleMaps;