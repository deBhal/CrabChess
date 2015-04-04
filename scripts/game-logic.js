/*
 * Crab Chess game logic
 */
var _ = require( 'lodash' );

var messages = require( './messages' );
var Board = require( './Board' );
var debug = require( 'debug' )( 'crab-chess' );

var _state;


messages.on( 'clicked', function( x, y ) {
	console.log( 'setSquare( ', arguments, ' )' );
	_state.selectedPosition.x = x;
	_state.selectedPosition.y = y;
	messages.emit( 'stateChanged', _state );
} );

messages.on( 'addPiece', function( x, y, playerIndex, value, state ) {
	console.log( 'got addPiece ', x, y, playerIndex, value );
	state = state || _state;
	if ( typeof value === 'undefined' ) {
		value = playerIndex;
	}

	_state.board.add( x, y, value );
} );

messages.on( 'clicked', function( x, y ) {
	console.log( 'emitting addPiece ', x, y, 8 );
	messages.emit( 'addPiece', x, y, 0 );
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
	messages.emit( 'stateChanged', _state );
	if ( setState || typeof setState === 'undefined' ) {
		_state = state;
	}
	return state;
}

function setState( newState ) {
	_state = newState;
}

var playerIndex = 0;

function pieceAt( x, y ) {
	return _.first( state.players, function( playerBoard ) {
		return v[ x ][ y ];
	} );
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


}

module.exports = {
	createState: createState,
	createPlayer: createPlayer,
	addPiece: addPiece,
	setState: setState,
	getState: getState,
	checkersSetup: checkersSetup
};