var React = require ( 'react' ),
	App = require ( './App' ),
	Logic = require( './game-logic' ),
	messages = require( './messages' );

var style = require( './style.css' );

var state = Logic.createState( 8 ),
	aPlayer = state.players[ 0 ];

React.render( <App state={state}/>, document.getElementById( 'root' ) );

messages.on( 'stateChanged', function( newState ) {
	React.render( <App state={state}/>, document.getElementById( 'root' ) );
} );
