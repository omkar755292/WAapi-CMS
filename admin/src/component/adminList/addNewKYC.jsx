import React, {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';

const AddNewKYCAdmin = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();


    const formData = new FormData();

    formData.append("companyId", myCompanyId);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("whatsappNumber", whatsappNumber);
    formData.append("password", password);
    
    console.log(formData);

  };


  return (
    <div>
      <PageHeader currentpage="Add New Users" activepage="Home" mainpage="Add New Users" />

      <div className="grid grid-cols-12 gap-x-6"></div>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <form onSubmit={handleSubmit}>
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

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Password</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                </div>

                <button type="submit" className="ti-btn ti-btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewKYCAdmin