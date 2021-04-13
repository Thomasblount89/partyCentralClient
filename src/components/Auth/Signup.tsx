

// this will be functional component
import { SyntheticEvent, Component } from "react";
import { isConstructorDeclaration } from "typescript";
import SignupDisplay from './SignupDisplay';


interface AcceptedProps {
  updateToken: (newToken: string) => void;
  clearToken: () => void;
  sessionToken: string | null;

}

interface user {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: boolean;

}

class Signup extends Component<AcceptedProps, user> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: false
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();


    fetch("http://localhost:4001/user/register", {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        role: false 
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        console.log(json.sessionToken)
        this.props.updateToken(json.sessionToken)
         
      });
  }

  // handleChange(e: SyntheticEvent) {
  //   const input = e.target as HTMLInputElement;
  //   console.log(input.name, input.value);
  //   this.setState((prevState: user) => {
  //     let pick: Pick<user, keyof user> = {
  //       ...prevState,
  //       [input.name]: input.value,
  //     };
  //     return pick;
  //   });
  // }

  firstnameChange(e: any) {
    console.log(e);
    this.setState({
      firstName: e.target.value
    })
  }

  lastnameChange(e: any) {
    console.log(e);
    this.setState({
      lastName: e.target.value
    })
  }

  emailChange(e: any){
    console.log(e);
    this.setState({
      email: e.target.value
    })
  }

  passwordChange(e:any) {
    console.log(e);
    this.setState({
      password: e.target.value
    })
  }



  render() {
    return (
      <div>
        <SignupDisplay
        onSubmit={this.handleSubmit.bind(this)}
        firstnameChange={this.firstnameChange.bind(this)}
        lastnameChange={this.lastnameChange.bind(this)}
        emailChange={this.emailChange.bind(this)}
        passwordChange={this.passwordChange.bind(this)}
        />
      </div>
    );
  }
}

export default Signup;
