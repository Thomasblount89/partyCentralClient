// this will be a stateful component 
 //CRUD
 //display


 import {Component, SyntheticEvent} from 'react';
 import CreateEvent from './CreateEvent'
 import EventUpdate from './EventUpdate'
 import EventDelete from './EventDelete'
// import RsvpIndex from './RsvpIndex';

 interface AcceptedProps{
  updateToken:(newToken:any) => void;
  clearToken:() => void;
  sessionToken: string|null;
 }

 interface events {
     id:string;
     eventTitle:string;
     eventTime:string;
     eventDate: string;
     eventLocation:string
     hostId: string
 }

   class EventIndex extends Component<AcceptedProps, events, {}> {
    constructor(props:AcceptedProps){
      super(props);
      this.state = {
        id:"",
        eventTitle:"",
        eventTime:"",
        eventDate: "",
        eventLocation:"",
        hostId: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
  
}

handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    // get all by host id?
    let url: string = "http://localhost:6000/events/:hostId"; //userId instead of a HostId maybe? OR serach by name to grab there events 
    let reqBody = {
      events: {
        id: this.state.id,
        eventTitle:this.state.eventTitle,
        eventTime:this.state.eventTime,
        eventDate:this.state.eventDate,
        eventLocation:this.state.eventLocation,
        hostId: this.state.hostId,
      },
    };

    fetch(url, {
        method: "GET",
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
  


    render(){
        return(
            <div className="CreateEvent">
                 <CreateEvent updateToken={this.props.
                    updateToken} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} /> 
                     <EventUpdate updateToken={this.props.
                    updateToken} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} /> 
                     <EventDelete updateToken={this.props.
                    updateToken} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} />
            </div>
        )
    }
}

export default EventIndex;