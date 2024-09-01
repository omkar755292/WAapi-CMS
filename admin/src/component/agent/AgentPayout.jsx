import React, { useState } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';

const AgentPayout = () => {
    const [paidBy, setPaidBy] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [date, setDate] = useState('');
    const [balanceAmount, setBalanceAmount] = useState(5000);

    const handlePayoutSubmit = (e) => {
        e.preventDefault();
        alert('Payout submitted');
    };

    return (
        <div>
            <PageHeader currentpage="Agent" activepage="Home" mainpage="Agent Payout" />

            <div className="w-60 box h-20 rounded border border-gray-300 flex items-center justify-center mb-4">
                <h2 className="text-lg font-semibold">Balance Amount:</h2>
                <span className="text-xl">${balanceAmount}</span>
            </div>

            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12">
                    <div className="box">

                        <div className="box-body">

                            <form onSubmit={handlePayoutSubmit}>
                                <div className="grid lg:grid-cols-2 gap-6 space-y-4 lg:space-y-0">
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Paid By</label>
                                        <select
                                            className="my-auto ti-form-input"
                                            value={paidBy}
                                            onChange={(e) => setPaidBy(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Payment Method</option>
                                            <option value="Bank">Bank</option>
                                            <option value="UPI-ID">UPI-ID</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Transaction Id</label>
                                        <input
                                            type="text"
                                            className="my-auto ti-form-input"
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
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
};

export default AgentPayout;
