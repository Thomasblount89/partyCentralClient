import { SyntheticEvent, Component } from "react";


interface AcceptedProps {
  updateToken: (newToken: string | null) => void;
  clearToken: () => void;
  sessionToken: string | null;

}
interface user {

  email: string;
  password: string;
}

class Login extends Component<AcceptedProps, user, {}> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
 
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    let url: string = "http://localhost:6000/user/login";
    let reqBody = {
      user: {
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
          <h2>Login</h2>

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

export default Login;
