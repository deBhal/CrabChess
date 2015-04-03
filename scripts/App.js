var React = require( 'react' );

var Square = React.createClass( {
	render: function() {
		var myClass = "";
		return <td className="selected">{ '('+ this.props.x + ',' + this.props.y + ')'}</td>;
	}
} );

module.exports = React.createClass ( {
	render: function() {
		var state = this.props.state;
		var rows = [];
		var y, x, currentRow;
		for ( y = 0; y < state.boardSize; y++ ) {
			currentRow = [];
			for ( x = 0; x < state.boardSize; x++ ) {
				currentRow.push( <Square x={x} y={y} state={state}/> );
			}

			rows.push( <tr>{currentRow}</tr> );
		}
		return (
			<span>
			<h1>Hello, hot world</h1>
			<p>{ JSON.stringify( this.props ) }</p>
			<table>
			{rows }
			</table>
			</span>
		);
	}
} );
