import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { tempAction, TEMP_ACTION } from './actions';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello World<button
          onClick={() => {
            this.props.tempAction;
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { temp: state.temp };
};

const mapDispatchToProps = dispatch => {
  return { tempAction: () => dispatch({ type: TEMP_ACTION }) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
