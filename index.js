var React = require('react');
var GoogleMapsLoader = require('google-maps');
var style = require('./style.js');

var GoogleMaps = React.createClass({
	getDefaultProps: function() {
		return {

		};
	},

	getInitialState : function() {
		return {

		};
	},

	componentDidMount : function() {
		var id = this.props.elId;
		
		var that = this;

		GoogleMapsLoader.onLoad(function(google) {
		    console.log('I just loaded google maps api');
		});

		GoogleMapsLoader.load(function(google) {
			var el = document.getElementById(id);
			var options = {
				zoom: that.props.zoom,
			    center: that.props.center,
			    mapTypeControl: that.props.mapTypeControl
			};
		    new google.maps.Map(el, options);
		});
	},

	render : function() {
		var className = this.props.googleMapsClassName;

		return (
			<div style={style} className={className} id={this.props.elId}>

			</div>
		);
	}
});

module.exports = GoogleMaps;