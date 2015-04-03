/*
 * Crab Chess game logic
 */

var messages = require( './messages' );

var _state;

messages.on( 'clicked', function( x, y ) {
	console.log( 'setSquare( ', arguments, ' )' );
	_state.selectedPosition.x = x;
	_state.selectedPosition.y = y;
	messages.emit( 'stateChanged', _state );
} );

function createState( boardSize ) {
	boardSize = boardSize || 8;
	_state = {
		boardSize: boardSize,
		players: [
			createPlayer( "Player 1" ),
			createPlayer( "Player 2" )
		],
		selectedPosition: {
			x: 1,
			y: 2
		}
	};
	messages.emit( 'stateChanged', _state );
	return _state;
}

function setState( newState ) {
	state = newState;
}

var playerIndex = 0;

function Player( name ) {
	this.name = name;
	this.index = playerIndex++;
	this.pieces = [ {
		x: 2 + this.index,
		y: 3
	}, {
		x: 4,
		y: 4 + this.index
	} ];

	this.addPiece = function addPiece( x, y ) {
		this.pieces.push( {
			x: x,
			y: y
		} );
		return this;
	};

	this.pieceAt = function pieceAt( x, y ) {
		var i, piece;
		for ( i in this.pieces ) {
			piece = this.pieces[ i ];
			if ( piece.x === x && piece.y === y ) {
				return piece;
			}
		}
		return false; // I wonder if this should be undefined
	};

	return this;
}

function addPiece( player, x, y ) {
	player.addPiece( x, y );
}

function createPlayer( name ) {
	return new Player( name );
}

function getState( state ) {
	return state;
}

module.exports = {
	createState: createState,
	createPlayer: createPlayer,
	addPiece: addPiece,
	setState: setState,
	getState: getState
};