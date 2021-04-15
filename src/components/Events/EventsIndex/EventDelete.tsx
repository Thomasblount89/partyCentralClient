import {Component, SyntheticEvent} from 'react';
import APIURL from '../../../helper/environment';

interface AcceptedProps{
    updateToken:(newToken:any) => void;
    clearToken:() => void;
    sessionToken: string|null;
   }

   interface events {
    id:"",
}


   class EventDelete extends Component<AcceptedProps, events, {}> {
    constructor(props:AcceptedProps){
      super(props);
      this.state = {
        id:"",
    
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
          //create event
          let url: string = `${APIURL}/events/Delete/:id`; // add the interperlation of the id #?
        
      
          fetch(url, {
              method: "Delete",
              headers: new Headers({
                "Content-type": "application/json",
              }),
            })
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                this.props.clearToken();
              });
          }

          render(){
            return(
                <div>
                    
                </div>
            )
        }
      }

          export default EventDelete;