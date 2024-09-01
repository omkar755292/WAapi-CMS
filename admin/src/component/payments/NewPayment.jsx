import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import { api } from '../../GlobalKey/GlobalKey';

const NewPayment = () => {
  const [amount, setAmount] = useState('');
  const [planId, setPlanId] = useState('');
  const [planData, setPlanData] = useState([]);
  const [offerCode, setOfferCode] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentEmail, setAgentEmail] = useState('');
  const [agentPrice, setAgentPrice] = useState('');
  const [date, setDate] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.post(api + '/api/plan/all-plan-data')
      .then(response => {
        setPlanData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching plan data:', error);
        setLoading(false);
      });
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(api + '/api/payment/create-new-payment', {
        planId,
        userName,
        userEmail,
        amount,
        agentEmail,
        offerCode,
        paymentDate: date,
        agentName,
        agentPrice
      });

      console.log(response);

      setUserName('');
      setUserEmail('');
      setAgentName('');
      setAgentEmail('');
      setAmount('');
      setPlanId('');
      setOfferCode('');
      setAgentPrice('');
      setDate('');

    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageHeader currentpage="New Payment" activepage="Home" mainpage="New Payment" />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <form onSubmit={handlePaymentSubmit}>
                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Amount</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Plan</label>
                    <select
                      className="my-auto ti-form-input"
                      value={planId}
                      onChange={(e) => setPlanId(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select a plan</option>
                      {planData.map((plan) => (
                        <option key={plan.plan_id} value={plan.plan_id}>{plan.planName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">User Name</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">User Email</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      required
                    />
                  </div>



                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent Name</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent Email</label>
                    <input
                      type="email"
                      className="my-auto ti-form-input"
                      value={agentEmail}
                      onChange={(e) => setAgentEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Agent Price</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={agentPrice}
                      onChange={(e) => setAgentPrice(e.target.value)}
                      required
                    />
                  </div>

                  
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Offer Code</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={offerCode}
                      onChange={(e) => setOfferCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Date</label>
                    <input
                      type="date"
                      className="my-auto ti-form-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
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
}

export default NewPayment;
