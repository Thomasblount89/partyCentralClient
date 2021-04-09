import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import  Nav from './components/Nav/NavDisplay';
import EventsCentral from './EventsCentral';
import EventIndex from './components/Events/EventIndex';

type Props = {
  props: string 
}

type State = {
  sessionToken: string|null
  updateToken:string|null
  clearToken:string|null
  Nav:string|null
  EventsCentral:string|null
  EventIndex:string|null
}


class App extends React.Component<Props, State> {
  constructor(props: Props){
    super(props)
    this.state = {
      sessionToken:"",
      updateToken:"",
      clearToken:"",
      Nav:"",
      EventsCentral:"",
      EventIndex:""

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

  updateToken = (newToken: any) => {
    console.log(newToken);
    localStorage.setItem('token', newToken);
    this.setState({sessionToken: newToken})
  }

  render(){
  return (
    <div className="App">
      <Nav updateToken={this.updateToken} logout={this.clearToken} token={this.state.sessionToken}/>
      <EventsCentral updateToken={this.updateToken} logout={this.clearToken} token={this.state.sessionToken} />
      <EventIndex updateToken={this.updateToken} logout={this.clearToken} token={this.state.sessionToken} />

   
    </div>
  );
  }
}


export default App;
