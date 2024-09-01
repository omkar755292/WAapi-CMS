import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import Swal from 'sweetalert2';

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.post(`${api}/api/plan/all-plan-data`);
      const updatedPlans = response.data.map(plan => ({
        ...plan,
        planDetails: convertHtmlToPlainText(plan.planDetails),
      }));
      setPlans(updatedPlans);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching plan data:', error);
      setLoading(false);
    }
  };

  const convertHtmlToPlainText = html => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const handleActionClick = (action, planId, planData) => {
    if (action === 'view') {
      Swal.fire({
        title: `${planData.planName} Plan Details`,
        html: `
          <div>
            <p><strong>Plan Name:</strong> ${planData.planName}</p>
            <p><strong>Plan Details:</strong> ${planData.planDetails}</p>
            <p><strong>Monthly Price:</strong> ${planData.monthlyPrice}</p>
            <p><strong>Monthly Discount:</strong> ${planData.monthlyDiscount}%</p>
            <p><strong>Yearly Price:</strong> ${planData.yearlyPrice}</p>
            <p><strong>yearly Discount:</strong> ${planData.yearlyDiscount}%</p>
            <p><strong>Status:</strong> ${planData.status}</p>
            <p><strong>Keywords:</strong> ${planData.keywords}</p>
          </div>
        `,
        confirmButtonText: 'Close',
      });
    } else if (action === 'edit') {
      navigate(`/edit-plan/${planData.plan_id}`);
    } else if (action === 'delete') {
      handleDeletePlan(planData.plan_id);
    }
  };

  const handleDeletePlan = async (planId) => {
    try {
      const response = await axios.post(`${api}/api/plan/delete-plan`, { planId });
      Swal.fire('Success', 'Plan deleted successfully', 'success');
      fetchPlans();
    } catch (error) {
      Swal.fire('Error', 'Failed to delete plan', 'error');
      console.error('Error deleting plan:', error);
    }
  };

  return (
    <div>
      <PageHeader currentpage="Plan" activepage="Home" mainpage="Plan Data" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box basic-data-table">
            <div className="box-body space-y-3">
              <div className="overflow-hidden table-bordered">
                {loading ? (
                  <div>Loading...</div>
                ) : plans.length === 0 ? (
                  <div>No plans available.</div>
                ) : (
                  <PlanTable plans={plans} onActionClick={handleActionClick} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanTable = ({ plans, onActionClick }) => {
  const [data, setData] = useState(plans);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    setData(plans);
  }, [plans]);

  const rowClick = (e, row) => {
    setSelectedName(row.getData().planName);
  };

  const handleActionClick = (action, row) => {
    const planData = row.getData();
    onActionClick(action, planData.id, planData);
  };

  const columns = [
    { title: 'Plan Name', field: 'planName', width: 150 },
    { title: 'Plan Details', field: 'planDetails', width: 300 },
    { title: 'Monthly Price', field: 'monthlyPrice', width: 150 },
    { title: 'Monthly Discount', field: 'monthlyDiscount', width: 150 },
    { title: 'Yearly Price', field: 'yearlyPrice', width: 150 },
    { title: 'Yearly Discount', field: 'yearlyDiscount', width: 150 },
    { title: 'Status', field: 'status', width: 150 },
    {
      title: 'Actions',
      field: 'actions',
      headerSort: false,
      width: 300,
      formatter: () => `
        <button class="ti-btn rounded-full ti-btn-primary">View</button>
        <button class="ti-btn rounded-full ti-btn-info">Edit</button>
        <button class="ti-btn rounded-full ti-btn-danger">Delete</button>
      `,
      cellClick: (e, cell) => {
        const action = e.target.className.includes('ti-btn-primary') ? 'view' :
          e.target.className.includes('ti-btn-info') ? 'edit' :
            e.target.className.includes('ti-btn-danger') ? 'delete' :
              '';
        handleActionClick(action, cell.getRow());
      },
    },
  ];

  return (
    <>
      <div className="box-body space-y-3">
        <div className="sortable-input">
          Selected Name: <p>{selectedName}</p>
        </div>
        <div className="overflow-hidden table-bordered">
          <div style={{ overflowX: 'auto' }}>
            <ReactTabulator
              columns={columns}
              data={data}
              options={{
                pagination: 'local',
                paginationSize: 10,
                paginationSizeSelector: [10, 20, 50, 100],
                paginationInitialPage: 1,
                paginationButtonCount: 5,
              }}
              className="ti-custom-table ti-striped-table ti-custom-table-hover"
              events={{ rowClick }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanList;
