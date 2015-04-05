var React = require( 'react' ),
	messages = require( './messages' );

var Square = React.createClass( {
	isSelected: function isSelected() {
		var selectedPosition = this.props.state.selectedPosition;
		return this.props.x === selectedPosition.x &&
			this.props.y === selectedPosition.y;
	},
	className: function() {
		var state = this.props.state;
		var classes = [ 'square' ],
			x = this.props.x,
			y = this.props.y;
		if ( this.isSelected() ) {
			classes.push( 'selected' );
		}
		if ( ( x + y ) % 2 ) {
			classes.push( 'odd' );
		}
		var occupyingPlayer = state.board[ x ][ y ];
		if ( typeof occupyingPlayer !== 'undefined' ) {
			classes.push( 'occupied' + occupyingPlayer );
		}
		if ( state.isValidMove( x, y ) ) {
			classes.push( 'validMove' );
		}
		return classes.join( ' ' );
	},
	render: function() {
		return <td onClick={ this.onClick } className={ this.className() }></td>;
	},
	onClick: function() {
		messages.emit( 'clicked', this.props.x, this.props.y );
	}
} );

module.exports = Square;