import React, { Component } from "react";
import routes from "./routes";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Header from "./containers/header";

const routeComponents = routes.map(({ path, component }, key) => (
  <Route exact path={path} component={withRouter(component)} key={key} />
));

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <>
            <Header />
            <div>{routeComponents}</div>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
