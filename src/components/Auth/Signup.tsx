

// this will be functional component
import { SyntheticEvent, Component } from "react";
import { isConstructorDeclaration } from "typescript";
import SignupDisplay from './SignupDisplay';
import { Redirect } from 'react-router-dom'
import APIURL from '../../helper/environment';


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
  redirect: string|null; 
}

class Signup extends Component<AcceptedProps, user> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      redirect: null
    };
    //this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault();


    fetch(`${APIURL}/user/register`, {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        this.props.updateToken(json.token)
        this.setState({redirect:"/event"})
         
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
    this.setState({
      firstName: e.target.value
    })
  }

  lastnameChange(e: any) {
    this.setState({
      lastName: e.target.value
    })
  }

  emailChange(e: any){
    this.setState({
      email: e.target.value
    })
  }

  passwordChange(e:any) {
    this.setState({
      password: e.target.value
    })
  }



  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
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
