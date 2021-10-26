import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodoComponent } from "./pages/00-todo/Todo";
import PrivacyPolicyComponent from "./pages/01-privacy-policy/PrivacyPolicy";
import TermsOfServiceComponent from "./pages/02-tos/TermsOfService";
import { Breadcrumb } from "react-bootstrap";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/privacy-policy">
            Privacy Policy
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/tos">Terms of Service</Breadcrumb.Item>
        </Breadcrumb>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/privacy-policy">
            <PrivacyPolicyComponent />
          </Route>
          <Route path="/tos">
            <TermsOfServiceComponent />
          </Route>
          <Route path="/">
            <TodoComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
