import {Component, SyntheticEvent} from 'react';

interface AcceptedProps{
    updateToken:(newToken:any) => void;
    clearToken:() => void;
    sessionToken: string;
   }

   interface events {
    eventTitle:string;
    eventTime:string;
    eventDate: string;
    eventLocation:string
}


   class EventUpdate extends Component<AcceptedProps, events, {}> {
    constructor(props:AcceptedProps){
      super(props);
      this.state = {
        eventTitle:"",
        eventTime:"",
        eventDate: "",
        eventLocation:"",
    
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
          //create event
          let url: string = "http://localhost:4001/events/edit/:id"; // add the interperlation of the id #?
          let reqBody = {
            events: {
              eventTitle:this.state.eventTitle,
              eventTime:this.state.eventTime,
              eventDate:this.state.eventDate,
              eventLocation:this.state.eventLocation,
           
            },
          };
      
          fetch(url, {
              method: "PUT",
              body: JSON.stringify(reqBody),
              headers: new Headers({
                "Content-type": "application/json",
                Authorization: this.props.sessionToken,
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

          export default EventUpdate;