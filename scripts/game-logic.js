/*
 * Crab Chess game logic
 */
var _ = require( 'lodash' );
var Emitter = require( 'emitter-component' );

var messages = require( './messages' );
var Board = require( './Board' );
var debug = require( 'debug' )( 'crab-chess' );

var _state;


messages.on( 'clicked', function( x, y, state ) {
	state = state || _state;
	var oldx = state.selectedPosition.x,
		oldy = state.selectedPosition.y;

	if ( oldx === undefined || oldy === undefined ) {
		state.selectedPosition.x = x;
		state.selectedPosition.y = y;
		state.emit( 'changed', _state );
		return;
	}

	if ( x === oldx && y === oldy ) {
		deselectSquare();
		state.emit( 'changed', _state );
		return;
	}

	if ( state.pieceAt( oldx, oldy ) === undefined ) {
		selectSquare( x, y );
		return;
	}

	if ( isValidMove( oldx, oldy, x, y ) ) {
		console.log( 'move( ', arguments, ' )' );
		move( oldx, oldy, x, y );
		deselectSquare();
		state.emit( 'changed', _state );
		return;
	}

	debug( 'Invalid move!' );
} );

messages.on( 'addPiece', function( x, y, playerIndex, value, state ) {
	debug( 'addPiece', x, y, playerIndex, value );
	state = state || _state;
	if ( typeof value === 'undefined' ) {
		value = playerIndex;
	}

	state.board.add( x, y, value );
	state.emit( 'changed' );
} );

function createState( boardSize, setState ) {
	boardSize = boardSize || 8;
	var state = {
		board: new Board( boardSize ),
		players: [
			createPlayer( "Player 1" ),
			createPlayer( "Player 2" )
		],
		selectedPosition: {
		},
		get validMovements() {
			var x, y, i, j, resultBoard, dx, dy,
				board = this.board,
				size = board.size;

			if (! this.selectedPosition ) {
				return [];
			}

			x = this.selectedPosition.x;
			y = this.selectedPosition.y;
			if ( x === undefined ||
					y === undefined ) {
				return [];
			}



			var currentPlayer = board[ x ][ y ];
			var playerPieces = board.pieces( currentPlayer );

			// We're going to take advantage of a board acting like a Set;
			resultBoard = new Board( size * 2 );

			// Brute force all the combinations
			for ( i = 0; i < playerPieces.length - 1; i++ ) {
				for ( j = i + 1; j < playerPieces.length; j++ ) {
					dx = playerPieces[ i ].x - playerPieces[ j ].x;
					dy = playerPieces[ i ].y - playerPieces[ j ].y;
					resultBoard[ size + dx ][ size + dy ] = 1;
					resultBoard[ size - dx ][ size - dy ] = 1;
				}
			}
			return resultBoard.pieces().map( function( piece ) {
				return {
					x: piece.x - size,
					y: piece.y - size
				};
			} );
		},
		isValidMove: function( x, y ) {
			var dx = x - this.selectedPosition.x;
			var dy = y - this.selectedPosition.y;
			return this.validMovements.some( function( v ) {
				return v.x == dx && v.y === dy;
			} );
		}
	};
	Emitter( state );
	if ( setState || typeof setState === 'undefined' ) {
		_state = state;
		_state.emit( 'replaced', state );
	}
	state.on( 'changed', function() {
		messages.emit( 'stateChanged' );
	} );
	state.pieceAt = pieceAt.bind( state, state );

	return state;
}

function setState( newState ) {
	_state = newState;
}

var playerIndex = 0;

function pieceAt( state, x, y ) {
	return state.board[ x ][ y ];
}

function Player( name ) {
	this.name = name;
	this.index = playerIndex++;

	return this;
}

function addPiece( x, y, player, state ) {
	( state || _state ).board.addPiece( x, y, player );
}

function createPlayer( name ) {
	return new Player( name );
}

function getState() {
	return _state;
}

// Turns out checkers has a notation that we can't use
// for Crab-Chess:
// http://en.wikipedia.org/wiki/English_draughts#Notation
function checkersSetup( state ) {
	state = state || _state;
	debug( 'checkersSetup' );
	var board = state.board = new Board( 8 );
	function row( x, y ) {
		for ( var i = 0; i < 4; i++ ) {
			var _x = i * 2 + x;
			board.add( _x, y, 0 );
			board.add( 7 - _x, 7 - y, 1 );
		}
	}
	row( 0, 0 );
	row( 1, 1 );
	row( 0, 2 );
	state.emit( 'changed' );
	return state;
}

function crabChessSetup( state ) {
	state = state || _state;
	debug( 'crabChessSetup' );
	var board = state.board = new Board( 8 );
	function row( y ) {
		for ( var x = 0; x < 8; x++ ) {
			board.add( x, y, 0 );
			board.add( x, 7 - y, 1 );
		}
	}
	row( 0 );
	row( 1 );
	state.emit( 'changed' );
	return state;
}

function selectSquare( x, y, state ) {
	var selectedPosition = ( state || _state ).selectedPosition;
	selectedPosition.x = x;
	selectedPosition.y = y;
	_state.emit( 'changed' );
}

function deselectSquare( state ) {
	( state || _state ).selectedPosition = {};
	_state.emit( 'changed' );
}

function isValidMove( oldx, oldy, newx, newy, state ) {
	state = state || _state;
	return state.board[ newx ][ newy ] !== state.board[ oldx ][ oldy ] &&
		state.isValidMove( newx, newy );
}

function move( oldx, oldy, newx, newy, state ) {
	debug( 'move', arguments );
	state = state || _state;
	if ( state.board[ newx ][ newy ] !== undefined ) {
		messages.emit( 'capture', newx, newy, state.board[ newx ][ newy ] );
	}
	state.board[ newx ][ newy ] = state.board.remove( oldx, oldy );
}

module.exports = {
	createState: createState,
	createPlayer: createPlayer,
	addPiece: addPiece,
	setState: setState,
	getState: getState,
	checkersSetup: checkersSetup,
	crabChessSetup: crabChessSetup
};