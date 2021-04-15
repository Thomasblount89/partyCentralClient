// this will be a stateful component
//CRUD
//display

import { Component, SyntheticEvent } from "react";
import MaterialTable from "material-table";
import APIURL from '../../../helper/environment';

interface AcceptedProps {
  updateToken: (newToken: any) => void;
  clearToken: () => void;
  sessionToken: string;
}

interface iUser {
  firstName: string;
  lastName: string;
  fullName: string;
  id: string;
  key: number | null;
}

class EventIndex extends Component<AcceptedProps, any> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      users: [],
      columns: [
        { title: "Host First Name", field: "user.firstName" },
        { title: "Host Last Name", field: "user.lastName" },
        { title: "Event Title", field: "eventTitle" },
        { title: "Event Time", field: "eventTime" },
        { title: "Event Date", field: "eventDate" },
        { title: "Event Location", field: "eventLocation" },
      
      ], 
      eventTableData:[],

    };
  }

  componentDidMount(): void {
    // get all events
    let allEvents: string = `${APIURL}/events/`;

    fetch(allEvents, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ eventTableData: (data.events)});
        console.log(this.state);
      });
  }

  render() {
    return (
      <div className="EventIndex">
        <h1>Event Component</h1>

        {/* <select onChange={this.handleSubmit}>
          {this.state.users.map((user: any) => (
            <option key={user} value={user.id}>
              {user.firstName}
            </option>
          ))}
        </select> */}

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
