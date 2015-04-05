/*
 * A 2d board representation.
 * we're looking for board.x.y = value or undefined,
 *
 * Adding: two equivilent options:
 * add (x, y, [value]) or board[x][y] = value
 */
function Board( boardSize ) {
	var i;
	this.size = boardSize;

	for ( i = 0; i < boardSize; i++ ) {
		this[ i ] = {};
	}

	return this;
}

Board.prototype.isValidIndex = function( i ) {
	return 0 <= i && i <= this.size;
};


/* So what we want here is for board[x][y] to work for setting and retreival -
 * the value that's been set previously,
 * An error for out-of-bounds
 * undefined if a peice hasn't been set */
Board.prototype.add = function( x, y, value ) {
	if ( ! this.isValidIndex( x ) ||
			! this.isValidIndex( y ) ) {
		throw new Error ( ' Board::addPiece: index out of bounds.  x: ' +
		x + ', y: ' + y + ', this.size: ' + this.size );
	}
	if ( typeof value === 'undefined' ) {
		value = true;
	}
	this[ x ][ y ] = value;
	return this;
};

Board.prototype.remove = function( x, y ) {
	var piece = this[ x ][ y ];
	delete this[ x ][ y ];
	return piece;
};

/*
 * Return an array containing the peices on the board;
 * @param player [optional] if defined, return only those pieces
 * with a value equal to player
 */
Board.prototype.pieces = function( player ) {
	var test, i, row, key, piece,
		result = [];
	if ( player === undefined ) {
		test = function() {
			return true;
		};
	} else {
		test = function( value ) {
			return value === player;
		};
	}
	for ( i = 0; i < this.size; i++ ) {
		row = this[ i ];
		for ( key in row ) {
			if ( test( piece = row[ key ] ) ) {
				result.push( {
					x: i,
					y: Number( key ),
					value: piece
				} );
			}
		}
	}
	return result;
};
// convenience sugar
Board.prototype.addPiece = Board.prototype.add;

Board.prototype.removePiece = Board.prototype.remove;
Board.prototype.take = Board.prototype.remove;
Board.prototype.takePiece = Board.prototype.remove;

module.exports = Board;