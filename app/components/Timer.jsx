var React = require( 'react' );
var Clock = require( 'Clock' );

var Timer = React.createClass( {
    render: function () {
        return (
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds={256}/>
            </div>
        )
    }
})

module.exports = Timer;