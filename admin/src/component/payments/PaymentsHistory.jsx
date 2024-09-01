import React, { Component, useEffect, useState } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/css/tabulator.min.css';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentsHistory = () => {
  const [paymentData, setPaymentData] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(api + '/api/payment/all-payment-data')
      .then(response => {
        setPaymentData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching payment data:', error);
        setLoading(false);
      });

  }, []);



  const handleView = (payment) => {
    Swal.fire({
      title: 'Payment Details',
      html: `
        <div style="text-align: left;">
          <strong>Payment Date:</strong> ${new Date(payment.paymentDate).toLocaleDateString()}<br/>
          <strong>Amount:</strong> ${payment.amount}<br/>
          <strong>Plan:</strong> ${payment.plan_data.planName}<br/>
          <strong>Offer Code:</strong> ${payment.offerCode}<br/>
          <strong>User ID:</strong> ${payment.user_id}<br/>
          <strong>Agent ID:</strong> ${payment.agent_id}<br/>
          <strong>Agent Price:</strong> ${payment.agentPrice}
          <strong>Status:</strong> ${payment.status}<br/>
        </div>
      `,
      confirmButtonText: 'Close',
      width: 'auto'
    });
  };

  const handleDelete = (payment_id) => {
    // Implement delete functionality here
    console.log(`Delete action for ${payment_id}`);
  };

  const handleShare = (payment_id) => {
    // Implement share functionality here
    console.log(`Share action for ${payment_id}`);
  };

  const handleActionClick = (action, payment) => {
    if (action === 'view') handleView(payment);
    if (action === 'edit') handleEdit(payment._id);
    if (action === 'delete') handleDelete(payment._id);
    if (action === 'share') handleShare(payment._id);
  };

  return (
    <div>
      <PageHeader currentpage="Payment History" activepage="Home" mainpage="Payment History" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box basic-data-table">
            <div className="box-body space-y-3">
              <div className="overflow-hidden table-bordered">
                {loading ? (
                  <div>Loading...</div>
                ) : paymentData.length === 0 ? (
                  <div>No Data available.</div>
                ) : (
                  <Home data={paymentData} onActionClick={handleActionClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      selectedName: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  rowClick = (e, row) => {
    this.setState({ selectedName: row.getData().name });
  };

  handleActionClick = (action, row) => {
    const payment = row.getData(); // Adjust according to your data structure
    this.props.onActionClick(action, payment);
  };

  render() {
    const columns = [
      { title: 'Payment Date', field: 'paymentDate', width: 200 },
      { title: 'User ID', field: 'user_id', width: 200 },
      { title: 'Status', field: 'status', width: 200 },
      { title: 'Amount', field: 'amount', width: 200 },
      { title: 'Plan', field: 'plan_data.planName', width: 200 },
      { title: 'Offer Code', field: 'offerCode', width: 200 },
      { title: 'Agent ID', field: 'agent_id', width: 200 },
      { title: 'Agent Price', field: 'agentPrice', width: 200 },
      {
        title: 'Actions',
        field: 'actions',
        headerSort: false,
        width: 350,
        formatter: (cell) => {
          return `
            <button class="ti-btn ti-btn-primary action-view">View</button>
            <button class="ti-btn ti-btn-danger action-delete">Delete</button>
            <button class="ti-btn ti-btn-secondary action-share">Share</button>
          `;
        },
        cellClick: (e, cell) => {
          const actionClass = e.target.className.split(' ').find(cls => cls.startsWith('action-'));
          if (actionClass) {
            const action = actionClass.split('-')[1];
            this.handleActionClick(action, cell.getRow());
          }
        }
      },
    ];

    return (
      <>
        <div className="box-body space-y-3">
          <div className="sortable-input">
            Selected Name: <p>{this.state.selectedName}</p>
          </div>
          <div className="overflow-hidden table-bordered">
            <div style={{ width: '100%' }}>
              <ReactTabulator
                columns={columns}
                data={this.state.data}
                options={{
                  layout: 'fitColumns',
                  pagination: 'local',
                  paginationSize: 10,
                  paginationSizeSelector: [10, 20, 50, 100],
                  paginationInitialPage: 1,
                  paginationButtonCount: 5,
                  paginationDataReceived: { last_page: 1 },
                  paginationDataSent: { page: 1, size: 10 }
                }}
                events={{ rowClick: this.rowClick }}
                data-custom-attr="test-custom-attribute"
                className="ti-custom-table ti-striped-table ti-custom-table-hover"
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
