import React, { useEffect, useState } from 'react';
import { ReactTabulator } from 'react-tabulator';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import { api } from '../../GlobalKey/GlobalKey';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(api + '/api/user/all-user-data')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box xl:overflow-auto">
            <div className="box-body">
              <div className="overflow-auto table-bordered">
                <div className="overflow-hidden ">
                  <div className='app-container'>
                    {loading ? (
                      <div>Loading...</div>
                    ) : users.length === 0 ? (
                      <div>No users available.</div>
                    ) : (
                      <Home users={users} navigate={navigate} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.users,
      selectedName: ''
    };
    this.ref = React.createRef();
  }

  rowClick = (e, row) => {
    this.setState({ selectedName: row.getData().name });
  };

  handleActionClick = (action, row) => {
    const userData = row.getData();
    const userId = userData.user_id;

    if (action.includes('primary')) {
      Swal.fire({
        title: 'User Details',
        html: `
          <div>
            <p><strong>Name:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Phone Number:</strong> ${userData.phone_number}</p>
            <p><strong>WhatsApp Number:</strong> ${userData.whatsapp_number}</p>
          </div>
        `,
        confirmButtonText: 'Close'
      });
    } else if (action.includes('info')) {
      this.props.navigate(`/user-edit/${userId}`);
    } else if (action.includes('danger')) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${api}/api/user/delete-user`, { userId })
            .then(response => {
              if (response.status === 200) {
                Swal.fire('Deleted!', 'User has been deleted.', 'success');
                // Update state after successful deletion
                this.setState(prevState => ({
                  data: prevState.data.filter(user => user.user_id !== userId)
                }));
              } else {
                throw new Error(response.data.message);
              }
            })
            .catch(error => {
              Swal.fire('Error!', `Failed to delete user: ${error}`, 'error');
            });
        }
      });
    } else if (action.includes('warning')) {
      this.props.navigate(`/user-subscription/${userId}`);
    }
  };

  render() {
    const columns = [
      { title: 'Name', field: 'name', width: 200 },
      { title: 'Email', field: 'email', width: 200 },
      { title: 'Phone Number', field: 'phone_number', width: 200 },
      { title: 'WhatsApp Number', field: 'whatsapp_number', width: 200 },
      {
        title: 'Actions',
        field: 'actions',
        headerSort: false,
        width: 400,
        formatter: (cell, formatterParams, onRendered) => {
          return `
            <button class="ti-btn rounded-full ti-btn-primary">View</button>
            <button class="ti-btn rounded-full ti-btn-info">Edit</button>
            <button class="ti-btn rounded-full ti-btn-warning">Subscription</button>
            <button class="ti-btn rounded-full ti-btn-danger">Delete</button>
          `;
        },
        cellClick: (e, cell) => {
          const action = e.target.className.split(' ')[2].split('-')[2];
          this.handleActionClick(action, cell.getRow());
        }
      },
    ];

    const options = {
      height: 300,
      movableRows: true,
      selectable: true,
      rowClick: this.rowClick,
      selectableCheck: (row) => row.getData().color !== 'yellow',
      rowSelectionChanged: (data, rows) => {
        // Handle row selection change if needed
      }
    };

    return (
      <>
        <div className="box-body space-y-3">
          <div className="sortable-input">
            Selected Name: <p>{this.state.selectedName}</p>
          </div>
          <div className="overflow-hidden table-bordered">
            <div style={{ overflowX: 'auto' }}>
              <ReactTabulator
                ref={this.ref}
                columns={columns}
                data={this.state.data}
                options={{
                  pagination: 'local',
                  paginationSize: 10,
                  paginationSizeSelector: [10, 20, 50, 100],
                  paginationInitialPage: 1,
                  paginationButtonCount: 5,
                  paginationDataReceived: { last_page: 1 },
                  paginationDataSent: { page: 1, size: 10 }
                }}
                className="ti-custom-table ti-striped-table ti-custom-table-hover"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
