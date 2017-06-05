var React = require( 'react' );

var CountdownForm = React.createClass( {
    onFormSubmit: function (e) {
        e.preventDefault();
        var time = this.refs.time.value;
        if ( time.match( /^[0-9]*$/ )) {
            this.refs.time.value = '';
            this.props.onSetCountdown( parseInt( time, 10 ));
        } else if ( time.match( /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/ )) {
            var hms = time.split(':');
            var seconds = (+hms[0]) * 60 * 60 + (+hms[1]) * 60 + (+hms[2] || 0);
            this.refs.time.value = '';
            this.props.onSetCountdown( seconds );
        } else {
            this.refs.time.value = '';
            // this.props.onSetCountdown( 0 );
        }
    },
    render: function () {
        return( 
            <div>
                <form ref="form" onSubmit={this.onFormSubmit} className="countdown-form">
                    <div>
                        <input type="text" placeholder="Enter seconds or HH:MM:SS" ref="time"/>
                    </div>
                    <div>
                        <button className="button expanded hollow">Start</button>
                    </div>
                </form>
            </div>
        )
    }
})

module.exports = CountdownForm;