import { Component, SyntheticEvent } from "react";

interface AcceptedProps {
  updateToken: (newToken: any) => void;
  clearToken: () => void;
  sessionToken: string | null;
}

interface iUser {
  firstName: string;
  lastName: string;
  fullName: string;
  id: string;
  key: number | null;
}

class Admin extends Component<AcceptedProps, any> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      users: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(): void {
    // get all users
    let allUsers: string = "http://localhost:4001/user/";

    fetch(allUsers, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ users: data.user });
        console.log(this.state);
      });
  }

  handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

    // get all by host id?
    let allHostsEvents: string = "http://localhost:4001/events/:hostId"; 

    fetch(allHostsEvents, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.props.updateToken(json.token);
      });
  }

  render() {
    return (
      <div className="Admin">

        <select onChange={this.handleSubmit}>
          {this.state.users.map((user: any) => (
            <option key={user} value={user.id}>
              {user.firstName}
            </option>
          ))}
        </select>

        <h1 onClick={this.handleSubmit}>Events</h1>
        <button type="submit">Events</button>
      </div>

      
    );
  }
}
export default Admin;