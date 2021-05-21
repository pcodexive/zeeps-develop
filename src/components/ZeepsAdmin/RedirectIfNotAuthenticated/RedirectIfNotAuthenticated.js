import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class RedirectIfNotAuthenticated extends Component {

  componentDidMount() {
    const cookies = new Cookies();
    if (cookies.get('SXNBdXRob3JpemVkQWRtaW4aS') !== 'SXRzVHJ1ZQSaA') {
      this.setState({ isRedirect: true })
    }
  }

  state = {
    isRedirect: false
  }

  render() {
    const { isRedirect } = this.state;
    if (isRedirect) {
      return <Redirect
        to={{
          pathname: "/admin-login",
        }}
      />
    }

    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}

export default RedirectIfNotAuthenticated;