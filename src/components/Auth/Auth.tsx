import { Component } from "react";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

interface AcceptedProps {
  updateToken: (newToken: any) => void;
  clearToken: () => void;
  sessionToken: string | null;
}

export default class Auth extends Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
  }
  render() {
    return (
      <div className="Auth">
        <Login
          updateToken={this.props.updateToken}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}/>
        <Signup
          updateToken={this.props.updateToken}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}/>
      </div>
    );
  }
}
