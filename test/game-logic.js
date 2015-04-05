var assert = require( 'chai' ).assert,
	GameLogic = require( '../scripts/game-logic.js' );

function comparePositions( a, b ) {
	if ( a.x < b.x ) {
		return -1;
	}
	if ( b.x < a.x ) {
		return 1;
	}
	if ( a.y < b.y ) {
		return -1;
	}
	if ( b.y < a.y ) {
		return 1;
	}
	return 0;
}

describe( 'validMovements', function() {
	it( 'should only allow side-to-side movements for a pair of horizontally adjacent pieces', function() {
		var state = GameLogic.createState( 4 );
		var board = state.board;
		board.addPiece( 1, 1 );
		board.addPiece( 2, 1 );
		state.selectedPosition = {
			x: 2,
			y: 1
		};
		validMoves = state.validMovements;
		assert.equal( validMoves.length, 2 );
		assert.deepEqual( validMoves.sort( comparePositions ), [ {
			x: -1,
			y: 0
		}, {
			x: 1,
			y: 0
		} ] );
	} );

	it( 'should allow king-like moves for a square of 4 adjacent pieces', function() {
		var state = GameLogic.createState( 4 );
		var board = state.board;
		board.addPiece( 1, 1 );
		board.addPiece( 1, 2 );
		board.addPiece( 2, 1 );
		board.addPiece( 2, 2 );
		state.selectedPosition = {
			x: 2,
			y: 1
		};
		validMoves = state.validMovements;
		assert.equal( validMoves.length, 8 );
		assert.deepEqual( validMoves.sort( comparePositions ), [ {
			x: -1,
			y: -1
		}, {
			x: -1,
			y: 0
		}, {
			x: -1,
			y: 1
		}, {
			x: 0,
			y: -1
		}, {
			x: 0,
			y: 1
		}, {
			x: 1,
			y: -1
		}, {
			x: 1,
			y: 0
		}, {
			x: 1,
			y: 1
		}
		] );
	} );

} );
