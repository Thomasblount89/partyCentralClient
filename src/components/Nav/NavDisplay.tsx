// this file needs 
// login/signup logic and button
// name of app/create an event logic and button
// search bar for  users search input options 

//this would need to be a stateful component
import {Component} from 'react';



  interface AcceptedProps{
      updateToken:(newToken:any) => void;
      clearToken:() => void;
      sessionToken: string|null;

     
  }

export default class NavDisplay extends Component<AcceptedProps, {}> {
    constructor(props:AcceptedProps){
      super(props)
      
}

    render(){
        return(
        
            <div className="NavDisplay">
                 

            </div>
        
        )
    }
}