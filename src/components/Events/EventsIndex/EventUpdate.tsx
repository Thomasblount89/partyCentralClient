import {Component, SyntheticEvent} from 'react';
import APIURL from '../../../helper/environment';
import Modal from '@material-ui/core/Modal';


interface AcceptedProps{
    updateToken:(newToken:any) => void | any;
    clearToken:() => void | any;
    sessionToken: string | any ;
    eventDetail:{} | any;
   }
  

//    interface events {
//     eventTitle:string;
//     eventTime:string;
//     eventDate: string;
//     eventLocation:string
// }


   class EventUpdate extends Component<AcceptedProps, {}> {
    constructor(props:AcceptedProps){
      super(props);
      this.state = {
        editEventTitle:"",
        editEventTime:"",
        editEventDate: "",
        editEventLocation:"",
    
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

handleSubmit(e: SyntheticEvent): void {
    e.preventDefault();
          //create event
          let url: string = `${APIURL}/events/edit/:id`; // add the interperlation of the id #?
          // let reqBody = {
          //   events: {
          //     eventTitle:this.state.editEventTitle,
          //     eventTime:this.state.eventTime,
          //     eventDate:this.state.eventDate,
          //     eventLocation:this.state.eventLocation,
           
          //   },
          // };
      
          fetch(url, {
              method: "PUT",
              // body: JSON.stringify(reqBody),
              headers: new Headers({
                "Content-type": "application/json",
                Authorization: this.props.sessionToken,
              }),
            })
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                this.props.sessionToken(json.sessionToken);
                console.log(this.props.sessionToken)
              });
          }

          pushMe = () => {
            console.log(this.props.eventDetail)
          }

          render(){
            return(
                <div>
                  {/* Put modal here */}
                    <button onClick={this.pushMe}> test</button>
                    {console.log(this.props.eventDetail)}
                    
                </div>
            )
        }
      }

          export default EventUpdate;

           // componentDidUpdate(): void {
  //   let editedEvent: string =`${APIURL}/events/edit/:id`; 

  //   fetch (editedEvent, {
  //     method: "PUT",
      // body: JSON.stringify({
      //   eventTitle:this.state.columns.field,
      //   eventTime:this.state.columns.field,
      //   eventDate:this.state.columns.field,
      //   eventLocation: this.state.columns.field
  //     }),
  //     headers: new Headers({
  //       "Content-type": "application/json",
  //       Authorization: this.props.sessionToken,

  //     })
  //   })
  //   .then ((res) => res.json())
  //   .then ((data) => {
  //     this.setState({eventTableData:data.events})
  //     console.log(this.state);
  //   })
  // }