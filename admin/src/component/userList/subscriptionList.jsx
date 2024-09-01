import React, { useEffect, useState } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import Swal from 'sweetalert2';

const SubscriptionList = () => {
    const { userId } = useParams();
    const [subData, setSubData] = useState({ plans: [] }); // Initialize with an empty array for plans
    const [planData, setPlanData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubscriptionData = async () => {
        try {
            const response = await axios.post(`${api}/api/user/all-subscription-data`, { userId });
            if (response.status === 200) {
                setSubData(response.data);
                console.log(response.data);
            } else {
                setSubData({ plans: [] }); // Ensure subData is initialized properly on error
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching subscription data:', error);
            setSubData({ plans: [] }); // Handle error by setting empty plans array
            setLoading(false);
        }
    };

    const fetchPlanData = async () => {
        try {
            const response = await axios.post(`${api}/api/plan/all-plan-data`);
            setPlanData(response.data);
        } catch (error) {
            console.error('Error fetching plan options:', error);
            Swal.fire('Error', 'Failed to fetch plan options', 'error');
        }
    };

    useEffect(() => {

        fetchSubscriptionData();
        fetchPlanData();
    }, [userId]);

    const handleAddPlan = () => {
        Swal.fire({
            title: 'Add New Plan',
            html: `<select id="swal-input1" class="swal2-input">
                    <option value="">Select Plan</option>
                    ${planData.map(plan => `<option value="${plan.plan_id}">${plan.planName}</option>`).join('')}
                  </select>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const planId = Swal.getPopup().querySelector('#swal-input1').value;
                const planName = Swal.getPopup().querySelector('#swal-input1 option:checked').text;

                if (!planId) {
                    Swal.showValidationMessage('Please select a plan');
                    return false;
                }

                return axios.post(`${api}/api/user/add-new-plan`, { userId, planId, planName })
                    .then(response => {
                        if (response.status === 201) {
                            return new Promise((resolve) => {
                                setTimeout(resolve, 2000); // 2-second delay
                            }).then(() => {
                                return axios.post(`${api}/api/user/all-subscription-data`, { userId });
                            });
                        } else {
                            throw new Error(response.data.message);
                        }
                    })
                    .then(response => {
                        setSubData(response.data); // Assuming setSubData is a state updater function
                        Swal.fire('Success', 'Subscription added successfully', 'success');
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    };


    const handleSubscribePlan = (subscriptionId, planId) => {
        Swal.fire({
            title: 'Activate Subscription',
            text: 'Are you sure you want to activate this subscription?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, activate it!',
            cancelButtonText: 'No, cancel!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return axios.post(`${api}/api/user/activate-subscription`, { userId, subscriptionId, planId })
                    .then(response => {
                        return new Promise((resolve) => {
                            setTimeout(resolve, 2000); // 2-second delay
                        }).then(() => {
                            return axios.post(`${api}/api/user/all-subscription-data`, { userId });
                        });
                    })
                    .then(response => {
                        setSubData(response.data);
                        Swal.fire('Activated!', 'Subscription has been activated.', 'success');
                    })
                    .catch(error => {
                        Swal.showValidationMessage(`Request failed: ${error}`);
                    });
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    };

    const handleUnSubscribePlan = () => {
        console.log('unsubscribe');
    };

    const handleExpiredPlan = () => {
        console.log('renew');
    };

    return (
        <div>
            <PageHeader currentpage="Subscription Data" activepage="Home" mainpage="Subscription Data" />
            <button onClick={handleAddPlan} type="button" className="py-3 px-4 ti-btn ti-btn-primary">
                Add New Plan
            </button>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">Subscription List</h5>
                        </div>
                        <div className="box-body">
                            {loading ? (
                                <div>Loading...</div>
                            ) : !subData || subData.plans.length === 0 ? (
                                <div>No Data available.</div>
                            ) : (
                                <div className="overflow-auto table-bordered">
                                    <div className='app-container'>
                                        <table id='user-datatable' className='ti-custom-table ti-striped-table ti-custom-table-hover'>
                                            <thead>
                                                <tr>
                                                    <th>Plan</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subData.plans.map(plan => (
                                                    <tr key={plan.plan_id}>
                                                        <td>{plan.plan_data.planName}</td>
                                                        <td>{plan.status}</td>
                                                        <td>
                                                            {plan.status === 'inactive' && (
                                                                <button
                                                                    onClick={() => handleSubscribePlan(subData.subscription_id, plan.plan_id)}
                                                                    type="button"
                                                                    className="ti-btn rounded-full ti-btn-primary"
                                                                >
                                                                    Subscribe
                                                                </button>
                                                            )}
                                                            {plan.status === 'active' && (
                                                                <button
                                                                    onClick={() => handleUnSubscribePlan(subData.subscription_id, plan.plan_id)}
                                                                    type="button"
                                                                    className="ti-btn rounded-full ti-btn-warning"
                                                                >
                                                                    Unsubscribe
                                                                </button>
                                                            )}
                                                            {plan.status === 'expired' && (
                                                                <button
                                                                    onClick={() => handleExpiredPlan(subData.subscription_id, plan.plan_id)}
                                                                    type="button"
                                                                    className="ti-btn rounded-full ti-btn-secondary"
                                                                >
                                                                    Renew
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionList;
