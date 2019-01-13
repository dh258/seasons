import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends React.Component {
  state = { lat: null, errMsg: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
        (position) => this.setState({ lat: position.coords.latitude }),
        (err) => this.setState({ errMsg: err.message })

    );
  }

  renderContent() {
    if (this.state.errMsg && !this.state.lat) {
      return <div>Error: {this.state.errMsg}</div>;
    }

    if (!this.state.errMsg && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>;
    }

    return <Loader msg="Waiting for location permission..."/>;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));