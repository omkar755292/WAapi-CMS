import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import useAuth from '../customeComponent/useAuth';
import Swal from 'sweetalert2';

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const { token, adminId } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.post(
          api + '/api/agent/all-agent-data',
          { adminId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Log out process and navigate to login page
          localStorage.removeItem('token');
          localStorage.clear();
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token && adminId) {
      fetchAgents();
    } else {
      setLoading(false);
    }
  }, [token, adminId, navigate]);

  const handleAddButtonClick = () => {
    navigate("/add-new-agent");
  };

  const handleEdit = (agentId) => {
    navigate(`/edit-agent/${agentId}`);
  };

  const handleView = (agentId) => {
    const agent = agents.find(agent => agent.agent_id === agentId);
    Swal.fire({
      title: `${agent.agentName} Details`,
      html: `
        <div>
          <p><strong>Email:</strong> ${agent.agentEmail}</p>
          <p><strong>Phone Number:</strong> ${agent.agentPhoneNumber}</p>
          <p><strong>Agent Id:</strong> ${agent.agent_id}</p>
          <!-- Add more details as needed -->
        </div>
      `,
      confirmButtonText: 'Close',
      showCancelButton: false,
      focusConfirm: false
    });
  };

  const handleDeactive = (agentId) => {
    console.log(`Deactivating agent with ID: ${agentId}`);
  };

  const handlePayout = (agentId) => {
    navigate(`/agent-payout/${agentId}`);
  };

  const handlePayIn = (agentId) => {
    navigate(`/agent-payin/${agentId}`);
  };

  const handleAllUsersData = (agentId) => {
    navigate(`/all-users/${agentId}`);
  };

  return (
    <div>
      <PageHeader currentpage="Agent Data" activepage="Home" mainpage="Agent Data" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box xl:overflow-auto">
            <div className="box-header">
              <h5 className="box-title">Agent</h5>
            </div>
            <div className="box-body">
              <button
                onClick={handleAddButtonClick}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                Enrol New Agent
              </button>
              <div className="overflow-auto table-bordered">
                <div className='app-container'>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <table
                      id='user-datatable'
                      className='ti-custom-table ti-striped-table ti-custom-table-hover'
                    >
                      <thead>
                        <tr>
                          <th>Agent Name</th>
                          <th>Agent Email</th>
                          <th>Phone Number</th>
                          <th>Agent Id</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agents.map(agent => (
                          <tr key={agent.agent_id}>
                            <td>{agent.agentName}</td>
                            <td>{agent.agentEmail}</td>
                            <td>{agent.agentPhoneNumber}</td>
                            <td>{agent.agent_id}</td>
                            <td>
                              <button
                                onClick={() => handleView(agent.agent_id)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-info">
                                View
                              </button>
                              <button
                                onClick={() => handleEdit(agent.agent_id)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-secondary">
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeactive(agent.agent_id)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-danger">
                                Deactive
                              </button>
                              <button
                                onClick={() => handlePayout(agent.agent_id)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-warning">
                                All Payout
                              </button>
                              <button
                                onClick={() => handlePayIn(agent.agent_id)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-secondary">
                                All Pay In
                              </button>
                              <button
                                onClick={() => handleAllUsersData(agent.agent_id)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-primary">
                                All User
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentList;
