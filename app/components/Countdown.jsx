var React = require( 'react' );
var Clock = require( 'Clock' );
var CountdownForm = require( 'CountdownForm' );
var Controls = require( 'Controls' );

var Countdown = React.createClass( {
    getInitialState: function () {
        return { 
            count: 0,
            countdownStatus: 'stopped'
        };
    },
    onStatusChange: function ( newStatus ) {
        if ( newStatus === 'stopped' ) {
            if ( this.timer ) {
                clearTimeout( this.timer );
            }
            this.setState({ count: 0 });
        }
        this.setState({ countdownStatus: newStatus });
    },
    componentDidUpdate: function( prevProps, prevState ) {
        if ( this.state.countdownStatus !== prevState.countdownStatus ) {
            switch( this.state.countdownStatus ) {
                case 'started':
                    this.startTimer();
                    break;
                case 'paused':
                    clearTimeout( this.timer );
                    break;
            }
        }
    },
    startTimer: function () {
        this.timer = setInterval(() => {
            var newCount = this.state.count - 1;
            this.setState( {
                count: newCount > 0 ? newCount : 0
            });
        }, 1000 );
    },
    handleSetCountdown: function( seconds ) {
        this.setState( {
            count: seconds,
            countdownStatus: 'started'
        });
    },
    render: function () {
        var {count} = this.state;
        var renderControls = () => {
            if ( this.state.countdownStatus === 'stopped' ) {
                return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
            } else {
                return <Controls countdownStatus={this.state.countdownStatus} onStatusChange={this.onStatusChange}/>;
            }
        }
        return (
            <div>
                <Clock totalSeconds={count}/>
                {renderControls()}
            </div>
        )
    }
})

module.exports = Countdown;