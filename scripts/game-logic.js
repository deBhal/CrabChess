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
			x: 1,
			y: 2
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
	return state.pieceAt( oldx, oldy ) !== undefined;
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
	checkersSetup: checkersSetup
};