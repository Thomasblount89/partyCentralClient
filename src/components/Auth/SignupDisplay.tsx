import React from 'react';

type Props ={
    onSubmit: (event: any) => void,
    firstnameChange: (event: any) => void,
    lastnameChange: (event: any) => void,
    emailChange: (event: any) => void,
    passwordChange: (event: any) => void,
}

const SignupDisplay = (props: Props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
          <h2>Sign-Up!</h2>

          <label htmlFor="firstName">First Name:</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={e => props.firstnameChange(e)}
          />
          <br />

          <label htmlFor="lastName">Last Name:</label>
          <br />
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={e => props.lastnameChange(e)}
          />
          <br />

          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            id="email"
            name="email" 
            onChange={e => props.emailChange(e)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
           onChange={e => props.passwordChange(e)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default SignupDisplay
