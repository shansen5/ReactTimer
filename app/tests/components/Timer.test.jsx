var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Timer = require('Timer');

describe('Timer', () => {
    it('should exist', () => {
        expect(Timer).toExist();
    });

    describe('handleStatusChange', () => {
        it('should start counting on started status', () => {
            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.handleStatusChange('started');
            expect(timer.state.countingStatus).toBe('started');
        });
        it('should pause counting on paused status', () => {
            var timer = TestUtils.renderIntoDocument(<Timer />);
            timer.handleStatusChange('started');
            setTimeout(() => {
                timer.handleStatusChange('paused');
                expect(timer.state.count).toBe(3);
                expect(timer.state.countingStatus).toBe('paused');
                done();
            }, 3001);
        });
    });
});