var React = require ( 'react' ),
	App = require ( './App' ),
	Logic = require( './game-logic' );

var style = require( './style.css' );

var state = Logic.createState( 8 ),
	aPlayer = state.players[ 0 ];

React.render( <App state={state}/>, document.getElementById( 'root' ) );
