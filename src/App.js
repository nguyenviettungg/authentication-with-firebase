import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import HomePage from "./components/pages/homepage/HomePage.jsx";
import ShopPage from "./components/pages/shop/Shop";
import Header from "./components/header/Header";
import SignInAndSignUp from "./components/pages/sign-in-and-sign-up/SignInAndSignUp";
import CheckOut from "./components/pages/checkout/CheckOut";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "../src/redux/user/user.actions";
import { selectCurrentuser } from "./redux/user/user.selectors";

import "./App.css";
import React from "react";

class App extends React.Component {
  unsubcribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubcribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
        // console.log(this.state);
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubcribeFromAuth();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckOut} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentuser,
});
const mapDispatchToProps = (dispatch) => {
  return { setCurrentUser: (user) => dispatch(setCurrentUser(user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
