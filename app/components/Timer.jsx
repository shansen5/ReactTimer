var React = require( 'react' );
var Clock = require( 'Clock' );
var Controls = require( 'Controls' );

var Timer = React.createClass( {
    getInitialState: function () {
        return {
            count: 0,
            countingStatus: 'paused'
        }
    },
    handleStatusChange: function ( newStatus ) {
        if ( newStatus === 'stopped' ) {
            if ( this.timer ) {
                clearInterval( this.timer );
            }
            this.setState({ count: 0 });
            newStatus = 'paused';
        }
        this.setState({ countingStatus: newStatus });
    },
    componentDidUpdate: function( prevProps, prevState ) {
        if ( this.state.countingStatus !== prevState.countingStatus ) {
            switch( this.state.countingStatus ) {
                case 'started':
                    this.startTimer();
                    break;
                case 'paused':
                    clearInterval( this.timer );
                    break;
            }
        }
    },
    componentWillUnmount: function () {
        clearInterval( this.timer );
        this.timer = undefined;
    },
    startTimer: function () {
        this.timer = setInterval(() => {
            this.setState( { count: this.state.count + 1 });
        }, 1000 );
    },
    render: function () {
        var {count, countingStatus} = this.state;
        return (
            <div>
                <h1 className="page-title">Timer</h1>
                <Clock totalSeconds={count}/>
                <Controls countingStatus={countingStatus} 
                        onStatusChange={this.handleStatusChange}/>
            </div>
        )
    }
})

module.exports = Timer;