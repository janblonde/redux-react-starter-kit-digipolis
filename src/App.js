import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Header,
  Footer,
  UserMenu,
} from '@acpaas-ui/react-components';
/**
 * More ACPaaS UI documentation can be found here:
 * https://digipolisantwerp.github.io/acpaas-ui_react/
 */
import './App.scss';
import Home from './components/Home/Home';

import { simpleAction } from './actions/simpleAction'

/*
 * mapDispatchToProps
*/
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

/*
 * mapStateToProps
*/
const mapStateToProps = state => ({
  ...state
})


class App extends Component {
  /**
   * @memberof App
   * @summary handles button click
   */
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  state = {
    isLoggedin: false,
    user: undefined,
  }

  componentDidMount() {
    fetch('/auth/isloggedin')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Request rejected with status ' + response.status);
        }
      })
      .then(data => this.setState({ isLoggedin: data.isLoggedin, user: data.user }))
      .catch(console.error);
  }

  goToLogin = () => {
    if (!this.state.isLoggedin) {
      window.location.href = '/auth/login/mprofiel';
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <Header>
            <div className="m-button-group">
              <div onClick={this.goToLogin}>
                <UserMenu
                  user={this.state.user}
                  loggedIn={this.state.isLoggedin}
                  logoutUrl="/auth/logout/callback/mprofiel">
                </UserMenu>
              </div>
            </div>
          </Header>
        </header>
        <div className="main u-wrapper">
          <div className="u-container u-margin-top-xx u-margin-bottom-lg" role="main">
            <div className="row">
              <div className="col-xs-12">
                <h1 className="u-margin-top-xl">Hello React starter kit!</h1>
                <Home />
              </div>
            </div>
          </div>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
          <button onClick={this.simpleAction}>Test redux action</button>
        </div>
        <br/>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
