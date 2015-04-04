var React = require( 'react' ),
	messages = require( './messages' );

var Square = React.createClass( {
	isSelected: function isSelected() {
		var selectedPosition = this.props.state.selectedPosition;
		return this.props.x === selectedPosition.x &&
			this.props.y === selectedPosition.y;
	},
	className: function() {
		var classes = [ 'square' ],
			x = this.props.x,
			y = this.props.y;
		if ( this.isSelected() ) {
			classes.push( 'selected' );
		}
		if ( ( x + y ) % 2 ) {
			classes.push( 'odd' );
		}
		var occupyingPlayer = this.props.state.board[ x ][ y ];
		if ( typeof occupyingPlayer !== 'undefined' ) {
			classes.push( 'occupied' + occupyingPlayer );
		}
		return classes.join( ' ' );
	},
	render: function() {
		return <td onClick={ this.onClick } className={ this.className() }></td>;
	},
	onClick: function() {
		console.log( 'clicked ' + this.props.x + ',' + this.props.y );
		messages.emit( 'clicked', this.props.x, this.props.y );
	}
} );

module.exports = Square;