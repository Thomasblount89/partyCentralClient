import { Component, SyntheticEvent } from "react";
import APIURL from "../../../helper/environment";
import TextField from "@material-ui/core/TextField";

interface AcceptedProps {
  updateToken: (newToken: any) => void | any;
  clearToken: () => void | any;
  sessionToken: string | any;
  closeModal: () => any;
  action: string | any;
  rsvpDetail: {} | any;
  // eventId: string|null;
}

class RsvpUpdate extends Component<AcceptedProps, any> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      dish: this.props.rsvpDetail.dish,
      rsvp: this.props.rsvpDetail.rsvp,
      eventId: this.props.rsvpDetail.eventId,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    if (this.props.action === "rsvp") {
      console.log("going to the handleAdd");
      this.handleAdd();
    } else if (this.props.action === "edit") {
      console.log("going to the handleEdit");
      this.handleEdit();
    } else if (this.props.action === "delete") {
      console.log("going to the handleDelete");
      this.handleDelete();
    } else {
      console.log("can't determine where to go, so just close the modal");
      window.alert(
        "Unable to submit your form. Closing modal, please try again."
      );
      this.props.closeModal();
    }
  };

  handleAdd = () => {
    let url: string = `${APIURL}/rsvp/creatersvp/${this.state.eventId}`;
    let reqBody = {
      dish: this.state.dish,
      rsvp: this.state.rsvp,
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
        this.props.closeModal();
      });
  }

  handleEdit = () => {
    let url: string = `${APIURL}/rsvp/edit/${this.props.rsvpDetail.id}`;
    let reqBody = {
      dish: this.state.dish,
      rsvp: this.state.rsvp,
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
  };

  handleDelete = () => {
    console.log("made it to delete handle");
    let url: string = `${APIURL}/rsvp/delete/id/${this.props.rsvpDetail.id}`;

    fetch(url, {
      method: "DELETE",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      // console.log(`${this.props.eventDetail.role}`,)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.closeModal();
      });
  };

  handleChange(event:any) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  
  renderNames() {
    if (this.props.action !== "rsvp") {
      return (
        <div>
          <TextField
            defaultValue={this.props.rsvpDetail.user.firstName}
            label="First Name"
            disabled
          />
          <TextField
            defaultValue={this.props.rsvpDetail.user.lastName}
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
            defaultValue={this.props.rsvpDetail.event.eventTitle}
            label="Event Title"
            disabled
          />
          <TextField
            defaultValue={this.props.rsvpDetail.dish}
            onChange={(event) => {
              this.setState({ dish: event.target.value });
            }}
            label="Dish"
          />
          <label>
            Rsvp:
            <input
              name="rsvp"
              type="checkbox"
              checked={this.state.rsvp}
              onChange={this.handleChange} />
          </label>

          {/* <FormControlLabel
            control={
              <Checkbox
                checked={this.props.rsvpDetail.rsvp}
                onChange={this.handleCheckbox}
               */}
              {/* />
            }
            label="Rsvp"
          /> */}

          <input type="submit" value="submit" />
        </form>

       
      </div>
    );
  }
}

export default RsvpUpdate;
