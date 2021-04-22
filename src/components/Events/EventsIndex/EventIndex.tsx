// this will be a stateful component
//CRUD
//display

import { Component } from "react";
import MaterialTable from "material-table";
import APIURL from "../../../helper/environment";
import EventUpdate from "./EventUpdate";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';

import ContactMailIcon from "@material-ui/icons/ContactMail";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button, Modal } from "react-bootstrap";

interface AcceptedProps {
  updateToken: (newToken: any) => void| any;
  clearToken: () => void | any;
  sessionToken: string | any;
  eventDetail: {} | any;
}

interface IState {
  users: [];
      isOpen: boolean;
      eventDetail: {};
      rowData: any|null;
      columns: any|null;
      eventTableData:[];
      action: string|any;
//  pass this IState as the second parameter of the class 
// you can add a property to the state and then you need to add their type here. 
}

class EventIndex extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      users: [],
      isOpen: false,
      eventDetail: {},
      rowData: "",
      action: "",
      columns: [
        { title: "Host First Name", field: "user.firstName" },
        { title: "Host Last Name", field: "user.lastName" },
        { title: "Event Title", field: "eventTitle" },
        { title: "Event Time", field: "eventTime" },
        { title: "Event Date", field: "eventDate" },
        { title: "Event Location", field: "eventLocation" },
        {
          title: "Edit",
          field: "internal_action",
          // editable: false,
          render: (rowData: any|null) =>
            rowData && (
              <IconButton
                color="primary"
                onClick={this.openModal.bind(this, rowData, "edit")}
              >
                <EditIcon />
              </IconButton>
            ),
        },
        {
          title: "Rsvp",
          field: "internal_action",
          // editable: false,
          render: (rowData: any) =>
            rowData && (
              <IconButton
                color="secondary"
                onClick={() => console.log(rowData)}
              >
                <ContactMailIcon />
              </IconButton>
            ),
        },
        {
          title: "Delete",
          field: "internal_action",
          // editable: false,
          render: (rowData: any) =>
            rowData && (
              <IconButton
                color="secondary"
                onClick={this.openModal.bind(this, rowData, "delete")}
              >
                <DeleteForeverIcon />
              </IconButton>
            ),
        },
      ],
      eventTableData: [],
    };
    this.closeModal = this.closeModal.bind(this);
  }

  //getEvent()
  componentDidMount(): void {


    console.log(this.props);
    // get all events
    let allEvents: string = `${APIURL}/events/`;

    fetch(allEvents, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ eventTableData: data.events });
        console.log(this.state);
      });
  }

  // OPTION 2 TO CONSOLE.LOG ROWDATA
  async openModal(rowData: any|null, action:string|any) {
    
    if (action === "add"){
      rowData ={
        eventTitle:"",
        eventTime:"",
        eventDate:"",
        eventLocation: "",
        firstName: "",
        lastName:"",

      }

    }
    
    await this.setState({
      eventDetail: rowData,
      action:action,
      isOpen: true,
    });
    console.log(this.state.eventDetail);
    console.log(this.state.action)
  }

  closeModal = () =>{
   this.setState({ isOpen: false });
   this.componentDidMount();
  }

  render() {
    return (
      <div className="EventIndex">
        
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>{`${this.state.action} Event!`}</Modal.Header>
          {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
          <Modal.Body>
            <EventUpdate
              updateToken={this.props.updateToken}
              clearToken={this.props.clearToken}
              sessionToken={this.props.sessionToken}
              eventDetail={this.state.eventDetail}
              closeModal={this.closeModal}
              action={this.state.action}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h1>Event Component</h1>
        <Button 
        variant="primary" 
        size="lg"
        onClick={this.openModal.bind(this, {}, "add")}
        >
      Create Event
    </Button>
        <MaterialTable
          title="Events"
          data={this.state.eventTableData}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

export default EventIndex;
