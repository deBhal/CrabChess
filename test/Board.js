var assert = require( 'chai' ).assert,
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
} );