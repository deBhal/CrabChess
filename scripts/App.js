var React = require( 'react' ),
	messages = require( './messages' ),
	_ = require( 'lodash' );


messages.on( 'clicked', function( x, y ) {
	console.log( 'got a click message, x:', x, ', y:', y );
} );

function sayClick() {
	console.log( "click!" );
}
// TODO: Make this reactive squares: http://stackoverflow.com/questions/20456694/grid-of-responsive-squares/20457076#20457076
var Square = React.createClass( {
	isSelected: function isSelected() {
		var selectedPosition = this.props.state.selectedPosition;
		return this.props.x === selectedPosition.x &&
			this.props.y === selectedPosition.y;
	},
	occupierAt: function isOccupied() {
		return _.find( this.props.state.players, function( player ) {
			return player.pieceAt( this.props.x, this.props.y ) && player;
		}, this );
	},
	className: function() {
		var classes = [ 'square' ];
		if ( this.isSelected() ) {
			classes.push( 'selected' );
		}
		if ( ( this.props.x + this.props.y ) % 2 ) {
			classes.push( 'odd' );
		}
		var occupyingPlayer = this.occupierAt( this.props.x, this.props.y );
		if ( occupyingPlayer ) {
			classes.push( 'occupied' + occupyingPlayer.index );
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

module.exports = React.createClass ( {
	render: function() {
		var state = this.props.state;
		var rows = [];
		var y, x, currentRow;
		for ( y = 0; y < state.boardSize; y++ ) {
			currentRow = [];
			for ( x = 0; x < state.boardSize; x++ ) {
				currentRow.push( <Square x={x} y={y} state={state}/> );
			}

			rows.push( <tr>{currentRow}</tr> );
		}
		return (
			<span>
			<h1>Crab Chess</h1>
			<p>{ JSON.stringify( this.props ) }</p>
			<table>
			{rows }
			</table>
			</span>
		);
	}
} );
