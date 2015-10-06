import './index.html';
import React from 'react';
import { Router, Route, Link } from 'react-router';
import Page from './Page';

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/page">Page</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
});

const routes = (
  <Route path="/" component={App}>
    <Route path="page" component={Page} />
  </Route>
);

function start () {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, 500);
  });
}

start().then(() => {
  React.render(<Router>{routes}</Router>, document.getElementById('app'));
});

