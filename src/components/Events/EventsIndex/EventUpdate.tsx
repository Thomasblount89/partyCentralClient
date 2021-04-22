import { Component, SyntheticEvent } from "react";
import APIURL from "../../../helper/environment";
import Modal from "@material-ui/core/Modal";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface AcceptedProps {
  updateToken: (newToken: any) => void | any;
  clearToken: () => void | any;
  sessionToken: string | any;
  eventDetail: {} | any;
}

//    interface events {
//     eventTitle:string;
//     eventTime:string;
//     eventDate: string;
//     eventLocation:string
// }

class EventUpdate extends Component<AcceptedProps, any> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      eventTitle: "",
      eventTime: "",
      eventDate: "",
      eventLocation: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event:any) => {
    console.log(event)
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    //event edit
    let url: string = `${APIURL}/events/edit/${this.props.eventDetail.id}`; 
    let reqBody = {
        eventTitle:this.props.eventDetail.eventTitle,
        eventTime:this.props.eventDetail.eventTime,
        eventDate:this.props.eventDetail.eventDate,
        eventLocation:this.props.eventDetail.eventLocation,
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
        this.props.sessionToken(json.sessionToken);
        console.log(this.props.sessionToken);
      });
  }

  // pushMe = () => {
  //   console.log(this.props.eventDetail);
  // };


  

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField onChange={this.handleChange} defaultValue={this.props.eventDetail.user.firstName} id="standard-basic" label="First Name" disabled />
          <TextField defaultValue={this.props.eventDetail.user.lastName} id="standard-basic" label="Last Name" disabled />
          <TextField defaultValue={this.props.eventDetail.eventTitle} onChange={(val) => {
              console.log(val);
              this.setState({eventTitle: val});
              }
           } id="standard-basic" label="Event Title"  />
          <TextField defaultValue={this.props.eventDetail.eventTime} onChange={(val) => {
              console.log(val);
              this.setState({eventTime: val});
              }} id="standard-basic" label="Event Time" />
          <TextField defaultValue={this.props.eventDetail.eventDate} onChange={(val) => {
              console.log(val);
              this.setState({eventDate: val});
              }}id="standard-basic" label="Event Date"  />
          <TextField defaultValue={this.props.eventDetail.eventLocation} onChange={(val) => {
              console.log(val);
              this.setState({eventLocation: val});
              }} id="standard-basic" label="Event Location"  />

          <input type= "submit" value="submit" name="submit"/>
     

        </form>
        {/* Put modal here
        <button onClick={this.pushMe}> test</button>
        {console.log(this.props.eventDetail)} */}
      </div>
    );
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
