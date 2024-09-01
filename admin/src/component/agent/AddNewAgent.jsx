import React, { useEffect, useState } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../customeComponent/useAuth';

const AddNewAgent = () => {
  const { token, adminId } = useAuth();
  const [agent, setAgent] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const { agentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgentData = async () => {
      if (agentId) {
        try {
          const response = await axios.post(api + '/api/admin/one-agent-data', { agentId }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const agentData = response.data;
          setAgent(agentData);
          setName(agentData.agentName);
          setEmail(agentData.agentEmail);
          setPhoneNumber(agentData.agentPhoneNumber);
          setWhatsappNumber(agentData.agentWhatsappNumber);
        } catch (error) {
          console.error('Error fetching agent data:', error);
          alert('Error fetching agent data. Please try again.');
        }
      } else {
        // Reset form fields for adding a new agent
        setName('');
        setEmail('');
        setPhoneNumber('');
        setWhatsappNumber('');
      }
    };

    if (token && adminId) {
      fetchAgentData();
    }
  }, [agentId, token, adminId]);

  const handleEnrolAgent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(api + '/api/agent/enrol-new-agent', {
        agentName: name,
        agentEmail: email,
        agentPhoneNumber: phoneNumber,
        agentWhatsappNumber: whatsappNumber,
        adminId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Agent enrolled successfully:', response);
      alert('Agent enrolled successfully!');
      
      setName('');
      setEmail('');
      setPhoneNumber('');
      setWhatsappNumber('');
      navigate('/agent-list');
    } catch (error) {
      console.error('Error enrolling new agent:', error);
      alert('An error occurred while enrolling the agent. Please try again.');
    }
  };

  return (
    <div>
      <PageHeader currentpage="Add New Agent" activepage="Home" mainpage="Add New Agent" />
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <form onSubmit={handleEnrolAgent}>
                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent Name</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent Email</label>
                    <input
                      type="email"
                      className="my-auto ti-form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent Phone Number</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent WhatsApp Number</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="ti-btn ti-btn-primary my-2">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewAgent;
