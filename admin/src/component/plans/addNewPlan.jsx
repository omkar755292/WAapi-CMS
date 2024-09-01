import React, { useEffect, useState } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import axios from 'axios';
import SunEditor from 'suneditor-react';
import { api } from '../../GlobalKey/GlobalKey';
import { useNavigate, useParams } from 'react-router-dom';

const AddNewPlan = () => {
  const { planId } = useParams();
  const [planName, setPlanName] = useState('');
  const [planDetails, setPlanDetails] = useState('');
  const [monthlyPrice, setMonthlyPrice] = useState('');
  const [yearlyPrice, setYearlyPrice] = useState('');
  const [monthlyDiscount, setMonthlyDiscount] = useState('');
  const [yearlyDiscount, setYearlyDiscount] = useState('');
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (planId) {
      axios.post(api + `/api/plan/one-plan-data`, { planId })
        .then(response => {
          const { planName, planDetails, monthlyPrice, yearlyPrice, monthlyDiscount, yearlyDiscount, keywords } = response.data;
          setPlanName(planName);
          setPlanDetails(planDetails);
          setMonthlyPrice(monthlyPrice);
          setYearlyPrice(yearlyPrice);
          setMonthlyDiscount(monthlyDiscount);
          setYearlyDiscount(yearlyDiscount);
          setKeywords(keywords);
        }).catch(error => {
          console.error('Error fetching plan data:', error);
        });
    } else {
      setPlanName('');
      setPlanDetails('');
      setMonthlyPrice('');
      setYearlyPrice('');
      setMonthlyDiscount('');
      setYearlyDiscount('');
      setKeywords('');
    }
  }, [planId]);

  const handlePlanSubmit = async (e) => {
    e.preventDefault();

    const url = planId ? `${api}/api/plan/edit-plan` : `${api}/api/plan/add-new-plan`;
    const payload = { planName, planDetails, monthlyPrice, yearlyPrice, monthlyDiscount, yearlyDiscount, keywords };
    if (planId) payload.planId = planId;

    try {
      const response = await axios.post(url, payload);
      console.log(response);
      setPlanName('');
      setPlanDetails('');
      setMonthlyPrice('');
      setYearlyPrice('');
      setMonthlyDiscount('');
      setYearlyDiscount('');
      setKeywords('');
      
      navigate('/plan-list');
    } catch (error) {
      alert(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <PageHeader currentpage={planId ? "Edit Plan" : "Add New Plan"} activepage="Home" mainpage={planId ? "Edit Plan" : "Add New Plan"} />

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12">
          <div className="box">
            <div className="box-body">
              <form onSubmit={handlePlanSubmit}>
                <div className="grid lg:grid-cols-1 gap-6 space-y-4 lg:space-y-0">
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Plan Name</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Plan Details</label>
                    <SunEditor
                      value={planDetails}
                      onChange={setPlanDetails}
                      setOptions={{
                        buttonList: [
                          ["undo", "redo"],
                          ["font", "fontSize"],
                          ['paragraphStyle', 'blockquote'],
                          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                          ["fontColor", "hiliteColor"],
                          ["align", "list", "lineHeight"],
                          ["outdent", "indent"],
                          ["table", "horizontalRule", "link", "image", "video"],
                          ["preview", "print"],
                          ["removeFormat"]
                        ],
                        defaultTag: "div",
                        minHeight: "300px",
                        showPathLabel: false,
                        attributesWhitelist: {
                          all: "style",
                          table: "cellpadding|width|cellspacing|height|style",
                          tr: "valign|style",
                          td: "styleinsert|height|style",
                          img: "title|alt|src|style"
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Monthly Price</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={monthlyPrice}
                      onChange={(e) => setMonthlyPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Yearly Price</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={yearlyPrice}
                      onChange={(e) => setYearlyPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Monthly Discount</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={monthlyDiscount}
                      onChange={(e) => setMonthlyDiscount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Yearly Discount</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={yearlyDiscount}
                      onChange={(e) => setYearlyDiscount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="ti-form-label mb-0">Keywords</label>
                    <input
                      type="text"
                      className="my-auto ti-form-input"
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
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

export default AddNewPlan;
