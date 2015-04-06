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
			<h3>A Simple Self-Modifying Game</h3>
			<table>
			{rows }
			</table>
			<p/>
			<button onClick={ function() { Logic.crabChessSetup(); } }>Crab Chess</button>
			<p/>
			<button onClick={ function() { Logic.checkersSetup(); } }>Checkers</button>
			{/* <p>{ JSON.stringify( this.props ) }</p> */}
			<p/>
			<span>Click on a piece to select it and highlight valid moves.<p/>
			Click again on the piece to deselect it, or click on a highlighted sqaure to move there.</span>
			<p/>
			Rules:<ul><li>Valid moves are determined by the relative positions of the player's pieces.</li>
			<li>Pieces are captured by moving onto them as in chess</li>
			<li>The game is won by eliminating all of the opponent's peices</li>
			<li>The game is drawn if it becomes impossible for either player to eliminate the other</li>
			</ul>
			<p/>

			This game is one of the simplest interpretations of the "Self-Modifying Game" described 
			by Douglas Hofstadter in <a href="http://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach"><em>Gödel, Escher, Bach</em></a>, wherein
			the rules of a game are encoded in the positions of the peices on a chess-board.<p/>
			In this instantiation, only the movements of the pieces change, and valid moves are determined by the relative position of the player's pieces.
			</span>
		);
	}
} );
