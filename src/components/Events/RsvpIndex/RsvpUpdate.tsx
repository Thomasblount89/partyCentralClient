import {Component, SyntheticEvent} from 'react';

interface AcceptedProps{
    updateToken:(newToken:any) => void;
    clearToken:() => void;
    sessionToken: string|null;
   }

   interface Rsvp {
    dish:string;
    rsvp:string;
    hostId:string; 
}

   class RsvpUpdate extends Component<AcceptedProps, Rsvp, {}> {
    constructor(props:AcceptedProps){
      super(props);
      this.state = {
         dish:"",
        rsvp:"",
        hostId:""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();

          //RSVP Update
          let url: string = "http://localhost:6000/rsvp/edit/:id"; // add the interperlation of the id #?
          let reqBody = {
            Rsvp: {
                Dish: this.state.dish,
                Rsvp: this.state.rsvp,
                HostId:this.state.hostId
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

          export default RsvpUpdate;