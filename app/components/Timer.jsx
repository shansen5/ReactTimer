var React = require( 'react' );
var Clock = require( 'Clock' );

var Timer = React.createClass( {
    render: function () {
        return (
            <div>
                <Clock totalSeconds={256}/>
                <h1 className="text-center page-title">Timer</h1>
            </div>
        )
    }
})

module.exports = Timer;