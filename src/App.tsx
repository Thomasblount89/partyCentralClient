import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import  NavDisplay from './components/Nav/NavDisplay';
import {Component} from 'react';

// import EventsCentral from './EventsCentral';
// import EventIndex from './components/Events/EventIndex';


interface IState {
  sessionToken: string|null;
  updateToken:string;
  clearToken:string;
  NavDisplay:string;
  EventsCentral:string;
  EventIndex:string;
}

class App extends Component<{}, IState> {
  constructor(props: {}){
    super(props)
    this.state = {
      sessionToken:"",
      updateToken:"",
      clearToken:"",
      NavDisplay:"",
      EventsCentral:"",
      EventIndex:"",

  }
  }


  clearToken = () => {
    localStorage.clear();
    this.setState({sessionToken: ''});
  }

  componentDidMount(){
    if (localStorage.getItem('token')){
      this.setState({sessionToken: (localStorage.getItem('token'))})
    }
  }

  updateToken = (newToken: string) => {
    console.log(newToken);
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken})
  }

  // HAVE UPDATE TOKEN ACCEPT PROPS IN NAVBAR DISPLAY... do we need to add a function comp for the search to place the update token in
  // how to pass props through a file to a child folder " login and signup"

  render(){
  return (
    <div className="App">
       <NavDisplay updateToken={this.updateToken} clearToken={this.clearToken}sessionToken={this.state.sessionToken}/> 
      {/* <EventsCentral updateToken={this.updateToken} logout={this.clearToken} token={this.state.sessionToken} />
      <EventIndex updateToken={this.updateToken} logout={this.clearToken} token={this.state.sessionToken} />  */}

   
    </div>
  );
  }
}


export default App;
