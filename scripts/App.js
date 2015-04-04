var React = require( 'react' ),
	_ = require( 'lodash' );

var messages = require( './messages' );
var Square = require( './Square' );


messages.on( 'clicked', function( x, y ) {
	console.log( 'got a click message, x:', x, ', y:', y );
} );

function sayClick() {
	console.log( "click!" );
}
// TODO: Make this reactive squares: http://stackoverflow.com/questions/20456694/grid-of-responsive-squares/20457076#20457076

module.exports = React.createClass ( {
	render: function() {
		var state = this.props.state;
		var rows = [];
		var y, x, currentRow;
		var boardSize = state.board.size;
		for ( y = 0; y < boardSize; y++ ) {
			currentRow = [];
			// Use graphics-style 0,0 in the bottom left corner so we can
			// use chess-like notation
			for ( x = 0; x < boardSize; x++ ) {
				currentRow.push( <Square x={x} y={7-y} state={state}/> );
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
