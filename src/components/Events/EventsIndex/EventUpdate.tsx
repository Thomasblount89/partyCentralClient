import { Component, SyntheticEvent } from "react";
import APIURL from "../../../helper/environment";
import TextField from "@material-ui/core/TextField";

interface AcceptedProps {
  updateToken: (newToken: any) => void | any;
  clearToken: () => void | any;
  sessionToken: string | any;
  eventDetail: {} | any;
  closeModal: () => any;
  action: string|any;
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
      eventTitle: this.props.eventDetail.eventTitle,
      eventTime: this.props.eventDetail.eventTime,
      eventDate: this.props.eventDetail.eventDate,
      eventLocation: this.props.eventDetail.eventLocation,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();

    if (this.props.action === "add") {
      console.log("going to the handleAdd");
      this.handleAdd(event);
    } else if (this.props.action === "edit") {
      console.log("going to the handleEdit");
      this.handleEdit(event);
    } else if (this.props.action === "delete") {
      console.log("going to the handleDelete");
      this.handleDelete(event);
    } else {
      console.log("can't determine where to go, so just close the modal");
      window.alert("Unable to submit your form. Closing modal, please try again.");
      this.props.closeModal();
    }
  };

  handleAdd = (event: any) => {
    //logic to add event
  }

  handleEdit = (event: any) => {
   let url: string = `${APIURL}/events/edit/${this.props.eventDetail.id}`;
   let reqBody = {
     eventTitle: this.state.eventTitle,
     eventTime: this.state.eventTime,
     eventDate: this.state.eventDate,
     eventLocation: this.state.eventLocation,
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
       this.props.closeModal();
     });
  }

  handleDelete = (event: any) => {
    //logic to delete event
  }

  renderNames() {
    if (this.props.action !== "add") {
      return (
        <div>
          <TextField
            defaultValue={this.props.eventDetail.user.firstName}
            label="First Name"
            disabled
          />
          <TextField
            defaultValue={this.props.eventDetail.user.lastName}
            label="Last Name"
            disabled
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderNames()}
          <TextField
            defaultValue={this.props.eventDetail.eventTitle}
            onChange={(event) => {
              this.setState({ eventTitle: event.target.value });
            }}
            label="Event Title"
          />
          <TextField
            defaultValue={this.props.eventDetail.eventTime}
            onChange={(event) => {
              this.setState({ eventTime: event.target.value });
            }}
            label="Event Time"
          />
          <TextField
            defaultValue={this.props.eventDetail.eventDate}
            onChange={(event) => {
              this.setState({ eventDate: event.target.value });
            }}
            label="Event Date"
          />
          <TextField
            defaultValue={this.props.eventDetail.eventLocation}
            onChange={(event) => {
              this.setState({ eventLocation: event.target.value });
            }}
            label="Event Location"
          />

          <input type="submit" value="submit" />
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
