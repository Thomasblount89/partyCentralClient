import { Component, SyntheticEvent } from "react";
import MaterialTable from "material-table";
import APIURL from '../../../helper/environment';
import RsvpUpdate from "./RsvpUpdate";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, Modal } from "react-bootstrap";


interface AcceptedProps {
  updateToken: (newToken: any) => void| any;
  clearToken: () => void | any;
  sessionToken: string | any;
}

  interface IState {
    // users: [];
        isOpen: boolean;
        rsvpDetail: {};
        rowData: any|null;
        columns: any|null;
        rsvpTableData:[];
        action: string|any;
        isAdmin: boolean;
  }

class RsvpIndex extends Component<AcceptedProps, IState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      // users: [],
      isOpen: false,
      rsvpDetail: {},
      rowData: "",
      action: "",
      isAdmin: JSON.parse(`${localStorage.getItem("isAdmin")}`),
      columns:[
      { title: "Event Title", field: "event.eventTitle" },
      { title: "Dish", field: "dish" },
      { title: "Rsvp", field: "rsvp" },
      { title: "Attender First Name", field: "user.firstName" },
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
        title: "Delete",
        field: "internal_action",
        // editable: false,
        render: (rowData: any) =>
          rowData && (
            <IconButton
              disabled={!this.state.isAdmin}
              color="secondary"
              onClick={this.openModal.bind(this, rowData, "delete")}
            >
              <DeleteForeverIcon />
            </IconButton>
          ),
      },      
    ],
    rsvpTableData: [],
    };
  }

  componentDidMount(): void {
    console.log(this.props);
    // get all rsvps
    let allRsvps: string = `${APIURL}/rsvp/`;

    fetch(allRsvps, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization:`${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ rsvpTableData: data.rsvps });
        console.log(this.state);
      });
  }

  async openModal(rowData: any|null, action:string|any) {
    await this.setState({
      rsvpDetail: rowData,
      action:action,
      isOpen: true,
    });
    console.log(this.state.rsvpDetail);
    console.log(this.state.action)
  }
  
  closeModal = () =>{
    this.setState({ isOpen: false });
    this.componentDidMount();
   }

  render() {
    return (
      <div className="RsvpIndex">
        
      <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header closeButton>{`${this.state.action} RSVP!`}</Modal.Header>
        <Modal.Body>
          <RsvpUpdate
            updateToken={this.props.updateToken}
            clearToken={this.props.clearToken}
            sessionToken={this.props.sessionToken}
            rsvpDetail={this.state.rsvpDetail}
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

      <h1>RSVP</h1>
      
      <MaterialTable
        title="Rsvp"
        data={this.state.rsvpTableData}
        columns={this.state.columns}
      />
    </div>
  );
}
}

export default RsvpIndex;
