var expect = require( 'expect' );
var React = require( 'react' );
var ReactDOM = require( 'react-dom' );
var TestUtils = require( 'react-addons-test-utils' );
var $ = require( 'jquery' );

var CountdownForm = require( 'CountdownForm' );

describe( 'CountdownForm', () => {
    it( 'should exist', () => {
        expect( CountdownForm ).toExist();
    });
    it( 'should call onSetCountdown if valid seconds entered', () => {
        var spy = expect.createSpy();
        var countdownForm = TestUtils.renderIntoDocument(
            <CountdownForm onSetCountdown={spy}/> );
        var $el = $( ReactDOM.findDOMNode( countdownForm ));
        countdownForm.refs.time.value = '111';
        TestUtils.Simulate.submit( $el.find( 'form' )[0] );
        expect( spy ).toHaveBeenCalledWith( 111 );
    });
    it( 'should not call onSetCountdown if invalid seconds entered', () => {
        var spy = expect.createSpy();
        var countdownForm = TestUtils.renderIntoDocument(
            <CountdownForm onSetCountdown={spy}/> );
        var $el = $( ReactDOM.findDOMNode( countdownForm ));
        countdownForm.refs.time.value = 'a';
        TestUtils.Simulate.submit( $el.find( 'form' )[0] );
        expect( spy ).toNotHaveBeenCalled();
    });
});