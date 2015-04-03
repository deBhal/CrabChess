/*
 * Crab Chess game logic
 */

function createState( boardSize ) {
	boardSize = boardSize || 8;
	return {
		boardSize: boardSize,
		players: [
			createPlayer( "Player 1" ),
			createPlayer( "Player 2" )
		]
	};

}

function Player( name ) {
	this.name = name;
	this.pieces = [];
	this.addPiece = function addPiece( x, y ) {
		this.pieces.push( {
			x: x,
			y: y
		} );
		return this;
	};
}

function addPiece( state, player, x, y ) {
	switch ( typeof player ) {
	case 'string':
	default:
	}
	player.addPiece( x, y );
}
function createPlayer( name ) {
	return new Player( name );
}

function update( state ) {
	return state;
}

module.exports = {
	createState: createState,
	createPlayer: createPlayer,
	addPiece: addPiece
};