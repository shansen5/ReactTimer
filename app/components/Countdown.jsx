var React = require( 'react' );
var Sound = require( 'react-sound' ).default;

var Clock = require( 'Clock' );
var CountdownForm = require( 'CountdownForm' );
var Controls = require( 'Controls' );

var Countdown = React.createClass( {
    getInitialState: function () {
        return { 
            count: 0,
            countingStatus: 'stopped'
        };
    },
    handleStatusChange: function ( newStatus ) {
        if ( newStatus === 'stopped' ) {
            if ( this.timer ) {
                clearInterval( this.timer );
            }
            this.setState({ count: 0 });
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
            var newCount = this.state.count - 1;
            this.setState( {
                count: newCount > 0 ? newCount : 0
            });
            if ( newCount === 0 ) {
                clearInterval( this.timer );
                this.setState( { countingStatus: 'stopped' } );
            }
        }, 1000 );
    },
    handleSetCountdown: function( seconds ) {
        this.setState( {
            count: seconds,
            countingStatus: 'started'
        });
    },
    render: function () {
        var {count} = this.state;
        var renderControls = () => {
            if ( this.state.countingStatus === 'stopped' ) {
                return <div>
                        <Sound url="http://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3" playStatus={Sound.status.PLAYING} />
                        <CountdownForm onSetCountdown={this.handleSetCountdown}/>
                    </div>;
            } else {
                return <Controls countingStatus={this.state.countingStatus} onStatusChange={this.handleStatusChange}/>;
            }
        }
        return (
            <div>
                <h1 className="page-title">Countdown</h1>
                <Clock totalSeconds={count}/>
                {renderControls()}
            </div>
        )
    }
})

module.exports = Countdown;