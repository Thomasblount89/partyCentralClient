import {Component, SyntheticEvent} from 'react';

interface AcceptedProps{
    updateToken:(newToken:any) => void;
    clearToken:() => void;
    sessionToken: string;
   }

   interface Rsvp {
    dish:string;
    rsvp:string;
    hostId:string;


    
}


   class RsvpCreate extends Component<AcceptedProps, Rsvp, {}> {
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
    
          //create rsvp
          let url: string = "http://localhost:4001/rsvp/creatersvp"; 
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
                    <h1>create rsvp</h1>
                </div>
            )
        }
      }

          export default RsvpCreate;