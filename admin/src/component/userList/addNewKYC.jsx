import React, { useEffect, useState } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import { useParams, useNavigate } from 'react-router-dom';

const AddNewUserKYC = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      axios.post(api + `/api/user/one-user-data`, { userId })
        .then(response => {
          console.log(response);
          setUser(response.data);
          setName(response.data.name);
          setEmail(response.data.email);
          setPhoneNumber(response.data.phone_number);
          setWhatsappNumber(response.data.whatsapp_number);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } else {
      setName('');
      setEmail('');
      setPhoneNumber('');
      setWhatsappNumber('');
    }
  }, [userId]);

  const handleUserKYC = async (e) => {
    e.preventDefault();
    const url = userId ? `${api}/api/user/edit-user` : `${api}/api/user/reg-new-user`;
    const payload = userId
      ? { userId, name, email, phone_number: phoneNumber, whatsapp_number: whatsappNumber }
      : { name, email, phone_number: phoneNumber, whatsapp_number: whatsappNumber };
    
    try {
      const response = await axios.post(url, payload);
      console.log(response);
      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setPhoneNumber('');
      setWhatsappNumber('');
      navigate('/user-list');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <PageHeader currentpage={userId ? "Edit User" : "Add New User"} activepage="Home" mainpage={userId ? "Edit User" : "Add New User"} />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <form onSubmit={handleUserKYC}>
                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Name</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Email</label>
                    <input
                      type="email"
                      className="my-auto ti-form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Phone Number</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">WhatsApp Number</label>
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

export default AddNewUserKYC;
