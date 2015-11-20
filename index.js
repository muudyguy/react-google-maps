var React = require('react');
var GoogleMapsLoader = require('google-maps');
var style = require('./style.js');

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
			
			var el = document.getElementById(id);
			var options = {
				zoom: that.props.zoom,
			    center: that.props.center,
			    mapTypeControl: that.props.mapTypeControl
			};
		    that.map = new google.maps.Map(el, options);
		    console.log(that.map);

	    	that.createArrowObjects(that.props.arrows);
		    that.setMapToArrows(that.map);

		    that.createPolygonObjects(that.props.polygons);
		    that.setMapToPolygons(that.map);

		    that.createMarkerObjects(that.props.markers);
		    that.setMapToMarkers(that.map);


		});
	},

	componentWillReceiveProps : function(props) {
		
		this.updateArrows(props.arrows);
		this.updatePolygons(props.polygons);
		this.updateMarkers(props.markers);

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