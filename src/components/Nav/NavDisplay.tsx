// this file needs 
// login/signup logic and button
// name of app/create an event logic and button
// search bar for  users search input options 

//this would need to be a stateful component
import {Component} from 'react';
import Login from './Auth/Login';
import Signup from './Auth/Signup';


  interface AcceptedProps{
      updateToken:(newToken:any) => void;
      clearToken:() => void;
      sessionToken: string|null;
    //   sessionToken:string|null
     
  }

export default class NavDisplay extends Component<AcceptedProps, {}> {
    constructor(props:AcceptedProps){
      super(props)
      
}

    render(){
        return(
        
            <div className="NavDisplay">
                 <Login updateToken={this.props.
                    updateToken} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} /> 
                <Signup  updateToken={this.props.
                    updateToken} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} />

            </div>
        
        )
    }
}