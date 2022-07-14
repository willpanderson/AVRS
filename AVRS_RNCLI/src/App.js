import * as React from 'react';

import HomePage from './HomePage';
import MainMenu from './MainMenu';

class App extends React.Component {
  state = {
    isLoggedIn: true,
  };

  logInOut = () => {
    let loggedIn = !this.state.isLoggedIn;
    this.setState({
      isLoggedIn: loggedIn,
    });
    console.log(this.state.isLoggedIn);
  };

  render() {
    if (this.state.isLoggedIn === true) {
      return <MainMenu logInChange={this.logInOut} />;
    } else {
      return <HomePage logInChange={this.logInOut} />;
    }
  }
}

export default App;
