// signIn logic

// this will be functional component
import { SyntheticEvent, Component } from "react";


interface AcceptedProps {
  updateToken: (newToken: string | null) => void;
  clearToken: () => void;
  sessionToken: string | null;

}
interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class Signup extends Component<AcceptedProps, user, {}> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    let url: string = "http://localhost:6000/user/register";
    let reqBody = {
      user: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      },
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.updateToken(json.sessionToken);
      });
  }

  handleChange(e: SyntheticEvent) {
    const input = e.target as HTMLInputElement;
    console.log(input.name, input.value);
    this.setState((prevState: user) => {
      let pick: Pick<user, keyof user> = {
        ...prevState,
        [input.name]: input.value,
      };
      return pick;
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Sign-Up!</h2>

          <label htmlFor="firstName">First Name:</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName} 
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName} 
            onChange={this.handleChange}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            value={this.state.email} 
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
            value={this.state.password} 
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Signup;
