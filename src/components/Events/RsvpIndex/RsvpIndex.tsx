import { Component, SyntheticEvent } from "react";


interface AcceptedProps {
  updateToken: (newToken: any) => void;
  clearToken: () => void;
  sessionToken: string;
}

interface iUser {
  firstName: string;
  lastName: string;
  fullName: string;
  id: string;
  key: number | null;
}

class RsvpIndex extends Component<AcceptedProps, any> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      users: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(): void {
    // get all users
    let allUsers: string = "http://localhost:4001/events/";

    fetch(allUsers, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: this.props.sessionToken,
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

  handleChange(e: SyntheticEvent) {
    const input = e.target as HTMLInputElement;
  }

  render() {
    return (
      <div className="RsvpIndex">
    <h1>Rsvp Component</h1>

        <select onChange={this.handleSubmit}>
          {this.state.users.map((user: any) => (
        
            <option key={user} value={user.id}>
              {user.firstName}
            </option>
          ))}
        </select>

        <h1 onClick={this.handleSubmit}></h1>
        <button type="submit">Rsvp</button>
      </div>
    );
  }
}

export default RsvpIndex;
