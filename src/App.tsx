import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Events from "./components/Events/EventsIndex/EventIndex";
import Rsvp from "./components/Events/RsvpIndex/RsvpIndex";
import NavDisplay from "./components/Nav/NavDisplay"

interface IState {
  sessionToken: string| any;
  updateToken: string | any;
  clearToken: string| any;
}

class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      updateToken: "",
      clearToken: "",
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

        {/* <NavDisplay
          updateToken={this.updateToken}
          clearToken={this.clearToken}
          sessionToken={this.state.sessionToken}
        /> */}

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
            path="/events"
            render={() => (
              <Events
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

        </Switch>

      </div>
    );
  }
}

export default App;
