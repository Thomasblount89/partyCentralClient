import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavDisplay from "./components/Nav/NavDisplay";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Events from "./components/Events/EventsIndex/EventIndex";
import User from "./components/Admin/Admin";
import Rsvp from "./components/Events/RsvpIndex/RsvpIndex";

interface IState {
  sessionToken: string | null;
  updateToken: string;
  clearToken: string;
  NavDisplay: string;
  Auth: string;
  EventIndex: string;
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      updateToken: "",
      clearToken: "",
      NavDisplay: "",
      Auth: "",
      EventIndex: "",
    };
  }

  clearToken = () => {
    localStorage.clear();
    this.setState({ sessionToken: "" });
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }

  updateToken = (newToken: string) => {
    console.log(newToken);
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            render={() => (
              <Auth
                updateToken={this.updateToken}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            )}
            exact
          />
          <Route
            path="/event"
            render={() => (
              <Events
                updateToken={this.updateToken}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            )}
          />
          <Route
            path="/user"
            render={() => (
              <User
                updateToken={this.updateToken}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            )}
          />
           <Route
            path="/rsvp"
            render={() => (
              <Rsvp
                updateToken={this.updateToken}
                clearToken={this.clearToken}
                sessionToken={this.state.sessionToken}
              />
            )}
          />

          {/* <Route path="/event" component={Events} />
          <Route path="/user" component={User} />
          <Route path="/rsvp" component={Rsvp} /> */}
        </Switch>

        {/* <Auth
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          sessionToken={this.state.sessionToken}
        /> */}

        {/* {/* <EventsCentral updateToken={this.updateToken} logout={this.clearToken} token={this.state.sessionToken} /> */}
        {/* <EventIndex
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          sessionToken={this.state.sessionToken}
        /> */}
      </div>
    );
  }
}

export default App;
