var React = require('react');
var GoogleMapsLoader = require('google-maps');
var style = require('./style.js');
var RichMarkerBuildFunction = require('./rich-markers');
var polyline = require('polyline');

var RichMarker;

var GoogleMaps = React.createClass({
	getDefaultProps: function() {
		return {
			arrows : [],
			polygons: [],
			markers: [],
            polylines: [],
            onDirectionCalculatedPolylineMode: function(){},
            onClick: function(event) {},
            onRightClick: function(event) {}
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
			this.createRichMarkerObjects(richMarkers);
			this.setMapToRichMarkers(this.map);	
		} else {
			
		}
	},
    
    _createPolylineObjects: function(customFormatPolylines) {
        var that = this;
        
        var colorVariations = [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FF00FF"
        ];
        
        var googleMapsPolylineObjects = [];
        var counter = 0;
        customFormatPolylines.forEach(function(customFormatPolyline) {
            console.log("SETTING");
            console.log(customFormatPolyline);
            googleMapsPolylineObjects.push(that._convertPolylineToGoogleFormat(customFormatPolyline, colorVariations[counter]));
            counter++;
        });
        this.googleMapsPolylineObjects = googleMapsPolylineObjects;
    },
    
    _convertPolylineToGoogleFormat: function(customFormatPolyline, color) {
        return new this.google.maps.Polyline({
            path: customFormatPolyline.path,
            strokeColor: color, //make dynamic later
            strokeOpacity: 1.0,
            strokeWeight: 2
        });
    },
    
    _setMapToPolylines: function(map) {
        this.googleMapsPolylineObjects.forEach(function(polyline) {
            polyline.setMap(map);
		});
    },
    
    _updatePolylines: function(customFormatPolylines) {
        if (this.googleMapsPolylineObjects !== undefined) {
			this.googleMapsPolylineObjects.forEach(function(polyline) {
				polyline.setMap(null);
			});
				
		}
        this._createPolylineObjects(customFormatPolylines);
        this._setMapToPolylines(this.map);
    },
    
    _addOnePolyline: function(customFormatPolyline) {
        if (this.googleMapsPolylineObjects !== undefined) {
            
        } else {
            this.googleMapsPolylineObjects = [];
        }
        
        var newGooglePolyline = this._convertPolylineToGoogleFormat(customFormatPolyline);
        this.googleMapsPolylineObjects.push(newGooglePolyline);
        newGooglePolyline.setMap(this.map); 
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
    
    _convertGoogleSentPolylineToCustomFormat(calculatedPolyline) {
        var customFormatPolyline;
        var path = [];
        calculatedPolyline.forEach(function(point) {
            var lat = point[0];
            var lng = point[1];
            var location = {
                lat: lat,
                lng: lng
            };
            path.push(location);
            
        });
        
        //todo Add stroke stuff later
        customFormatPolyline = {
            path: path
        }
        
        return customFormatPolyline;
    },
    
    _createAndDrawDriverDirectionAsPolyline(direction) {
        var startPoint = direction.startPoint;
        var endPoint = direction.endPoint;
        
        var startLatLng = new this.google.maps.LatLng(startPoint.lat, startPoint.lng);
        var endLatLng = new this.google.maps.LatLng(endPoint.lat, endPoint.lng);
        
        var request = {
            origin:startLatLng,
            destination:endLatLng,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true
        };
        
        var that = this;
        this.directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                console.log("routes");
                console.log(result.routes);
                
                //Polyline of the direction
                var customFormatPolylineList = result.routes.map(function(route) {
                    var calculatedPolyline = polyline.decode(route.overview_polyline);
                    var customFormatPolyline = that._convertGoogleSentPolylineToCustomFormat(calculatedPolyline);
                    return customFormatPolyline;
                });
                that._updatePolylines(customFormatPolylineList);
                that.props.onDirectionCalculatedPolylineMode(customFormatPolylineList);
            }
        });
    },
    
    _registerEvents: function(map) {
        var that = this;
        this.google.maps.event.addListener(map, "rightclick", function(event) {
            that.props.onRightClick(event);
        });
        
        this.google.maps.event.addListener(map, "click", function(event) {
            that.props.onClick(event);
        });
    },

	componentDidMount : function() {
		var id = this.props.elId;
		
		var that = this;

        GoogleMapsLoader.KEY = "AIzaSyDnZYgZODRPgG04QyXN9nrCis1ulZxvv0w";
		GoogleMapsLoader.load(function(google) {
			that.google = google;
            that.directionsService = new google.maps.DirectionsService();
            // that.directionsDisplay = new google.maps.DirectionsRenderer();
            
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
            
            // Set up polylines
            that._createPolylineObjects(that.props.polylines);
            that._setMapToPolylines(that.map);
            
            if (that.props.direction) {
                that._createAndDrawDriverDirectionAsPolyline(that.props.direction);
            }
            
            that._registerEvents(that.map);
		});
	},
    
    reset: function() {
        
    },

	componentWillReceiveProps : function(props) {
		this.updateArrows(props.arrows);
		this.updatePolygons(props.polygons);
		this.updateMarkers(props.markers);
		this.updateRichMarkers(props.richMarkers);
        this._updatePolylines(props.polylines);
        
        if (props.direction) {
            this._createAndDrawDriverDirectionAsPolyline(props.direction);
        }
	},

	render : function() {
		var className = this.props.googleMapsClassName;
        // console.log(this.props.elId);
		return (
			<div className={className} id={this.props.elId}>

			</div>
		);
	}
});

module.exports = GoogleMaps;