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
};

// convenience sugar
Board.prototype.addPiece = Board.prototype.add;

Board.prototype.remove = function( x, y ) {
	var piece = this[ x ][ y ];
	delete this[ x ][ y ];
	return piece;
};

module.exports = Board;