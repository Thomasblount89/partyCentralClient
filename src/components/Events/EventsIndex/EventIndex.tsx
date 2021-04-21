// this will be a stateful component
//CRUD
//display

import React, { Component } from "react";
import MaterialTable, { MTableAction } from "material-table";
import APIURL from "../../../helper/environment";
import EventUpdate from "./EventUpdate";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, Modal } from "react-bootstrap";

interface AcceptedProps {
  updateToken: (newToken: any) => void| any;
  clearToken: () => void | any;
  sessionToken: string | any;
  eventDetail: {} | any;
}

// interface eventDetail {
//   eventTitle: any;
//   eventTime: any;
//   eventDate: any;
//   eventLocation: any;
// }

class EventIndex extends Component<AcceptedProps, any> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      users: [],
      isOpen: false,
      eventDetail: {},
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
          editable: false,
          render: (rowData: any) =>
            rowData && (
              <IconButton
                color="primary"
                onClick={this.openModal.bind(this, rowData)}
              >
                <EditIcon />
              </IconButton>
            ),
        },
        {
          title: "Rsvp",
          field: "internal_action",
          editable: false,
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
          editable: false,
          render: (rowData: any) =>
            rowData && (
              <IconButton
                color="secondary"
                onClick={() => console.log(rowData)}
              >
                <DeleteForeverIcon />
              </IconButton>
            ),
        },
      ],
      eventTableData: [],
    };
  }

  //getEvent()
  componentDidMount(): void {
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

  //OPTION 1 TO CONSOLE.LOG ROWDATA
  // openModal = (rowData:any) => this.setState({
  //   isOpen: true,
  //   eventDetail: rowData,

  //  });

  // OPTION 2 TO CONSOLE.LOG ROWDATA
  async openModal(rowData: any) {
    await this.setState({
      eventDetail: rowData,
      isOpen: true,
  
    });
  
    // console.log(rowData);
    console.log(this.state.eventDetail);
    

  // .then((rowData:any) => this.setState({
  //  eventDetail:rowData}))
  //  .then(() => this.setState ({
  //    isOpen:true,
  //  }))
  // }

  }

  //  openModal = async (params:any) => {
  //    console.log(rowData)

  // .then((rowData:any) => this.setState({
  //  eventDetail:rowData}))
  //  .then(() => this.setState ({
  //    isOpen:true,
  //  }))
  // }

  closeModal = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="EventIndex">
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>Modal heading</Modal.Header>
          {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
          <Modal.Body>
            <EventUpdate
              updateToken={this.state.updateToken}
              clearToken={this.state.clearToken}
              sessionToken={this.state.sessionToken}
              eventDetail={this.state.eventDetail}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <h1>Event Component</h1>

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
