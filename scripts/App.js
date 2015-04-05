var React = require( 'react' ),
	_ = require( 'lodash' );

var messages = require( './messages' );
var Square = require( './Square' );
var Logic = require( './game-logic' );

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
				currentRow.push( <Square x={x} y={7-y} state={state}></Square> );
			}

			rows.push( <tr>{currentRow}</tr> );
		}
		return (
			<span>
			<h1>Crab Chess</h1>
			<table>
			{rows }
			</table>
			<p/>
			<button onClick={ function() { Logic.crabChessSetup(); } }>Crab Chess</button>
			<p/>
			<button onClick={ function() { Logic.checkersSetup(); } }>Checkers</button>
			{/* <p>{ JSON.stringify( this.props ) }</p> */}
			</span>
		);
	}
} );
