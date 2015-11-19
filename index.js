var React = require('react');
var GoogleMapsLoader = require('google-maps');
var style = require('./style.js');

var GoogleMaps = React.createClass({
	getDefaultProps: function() {
		return {
			arrows : [],
			polygons: []
		};
	},

	getInitialState : function() {
		return {

		};
	},

	getMarkers : function() {
	},

	createPolygonObjects : function(polygons) {
		var that = this;

		var googleMapsPolygonObjects = [];
		polygons.forEach(function(polygon) {
			// console.log(polygon);
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
			console.log('google maps not yet ready !');
		}
	},

	createArrowObjects : function(arrows) {
		var that = this;


		var arrowSymbol = {
	    	path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
	  	};

		var googleMapsArrowObjects = [];
		arrows.forEach(function(arrow) {
			console.log(arrow);	
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
			console.log('google maps not yet ready !');
		}
	},

	componentWillMount: function() {
		
	},

	componentDidMount : function() {
		console.log('in component did mount');
		var id = this.props.elId;
		
		var that = this;

		GoogleMapsLoader.load(function(google) {
			that.google = google;
			console.log('maps LOAD');
			var el = document.getElementById(id);
			var options = {
				zoom: that.props.zoom,
			    center: that.props.center,
			    mapTypeControl: that.props.mapTypeControl
			};
		    that.map = new google.maps.Map(el, options);

	    	that.createArrowObjects(that.props.arrows);
		    that.setMapToArrows(that.map);

		    that.createPolygonObjects(that.props.polygons);
		    that.setMapToPolygons(that.map);


		});
	},

	componentWillReceiveProps : function(props) {
		console.log('in component will receive props');
		console.log(props);
		this.updateArrows(props.arrows);
		this.updatePolygons(props.polygons);

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