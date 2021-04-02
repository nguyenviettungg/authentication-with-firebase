import { Route, Switch } from "react-router";

import HomePage from "./components/pages/homepage/HomePage.jsx";
import ShopPage from "./components/pages/shop/Shop";
import Header from "./components/header/Header";
import SignInAndSignUp from "./components/pages/sign-in-and-sign-up/SignInAndSignUp";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentUser: null };
  }
  unsubcribeFromAuth = null;
  componentDidMount() {
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
        // console.log(this.state);
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
