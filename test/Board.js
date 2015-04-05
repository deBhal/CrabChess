var assert = require( 'chai' ).assert,
	_ = require( 'lodash' ),
	Board = require( '../scripts/Board.js' );


describe( 'Board', function() {
	it( 'should throw for out of bounds queries', function() {
		var board = Board( 8 );
		assert.throws( function() {
			return board[ 12 ][ 2 ];
		} );
	} );

	it( 'should return undefined for unpopulated squares', function() {
		var board = new Board( 5 );
		assert.isUndefined( board[ 4 ][ 4 ] );
	} );

	it ( 'should return default values inserted with add(x,y)', function() {
		var board = new Board( 12 );
		board.add( 3, 5 );
		assert( board[ 3 ][ 5 ] );
	} );

	it( 'should return complex values inserted with add(x,y)', function() {
		var board = new Board( 12 );
		board.add( 3, 5, {
			1: 23,
			'testTarget': {
				'inner': 'value'
			}
		} );
		assert.deepPropertyVal( board[ 3 ][ 5 ], 'testTarget.inner', 'value' );
	} );

	describe( 'pieces', function() {
		it( 'should return an empty array for an empty board', function() {
			assert.deepEqual( new Board( 8 ).pieces(), [] );
		} );

		it( 'should return an added piece', function() {
			var board = new Board( 10 );
			board.addPiece( 4, 7, 1 );
			assert.deepEqual( board.pieces(), [ {
				x: 4,
				y: 7,
				value: 1
			} ] );
		} );

		it( 'should return player specific pieces', function() {
			var board = new Board( 3 );
			board[ 0 ][ 0 ] = 0;
			board[ 1 ][ 1 ] = 1;
			board[ 0 ][ 1 ] = 2;
			board[ 1 ][ 0 ] = 2;
			board[ 0 ][ 2 ] = 2;
			board[ 1 ][ 2 ] = 2;


			assert.deepEqual( board.pieces( 0 ), [ {
				x: 0,
				y: 0,
				value: 0
			} ] );

			assert.deepEqual( board.pieces( 1 ), [ {
				x: 1,
				y: 1,
				value: 1
			} ] );

			assert ( board.pieces( 2 ).length = 4 );

			assert ( board.pieces( 2 ).every( function( value ) {
				return value.x != value.y;
			} ), 'pieces(2) should not contain the 0 or 1 pieces' );

		} );

	} );


} );