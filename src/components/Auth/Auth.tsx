import { Component } from "react";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

      <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>
          <Login
          updateToken={this.props.updateToken}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
          <Signup
          updateToken={this.props.updateToken}
          clearToken={this.props.clearToken}
          sessionToken={this.props.sessionToken}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
    );
  }
}
