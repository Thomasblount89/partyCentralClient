import {Component, SyntheticEvent} from 'react';

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


   class CreateEvent extends Component<AcceptedProps, events, {}> {
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
          //create event
          let url: string = "http://localhost:6000/events/createevent"; 
          let reqBody = {
            events: {
              eventTitle:this.state.eventTitle,
              eventTime:this.state.eventTime,
              eventDate:this.state.eventDate,
              eventLocation:this.state.eventLocation,
              hostId: this.state.hostId,
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

          render(){
            return(
                <div>
                    
                </div>
            )
        }
      }

          export default CreateEvent;