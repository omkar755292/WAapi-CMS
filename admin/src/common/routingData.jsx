import AddNewKYCAdmin from "../component/adminList/addNewKYC";
import AdminList from "../component/adminList/adminList";
import ComplaintBox from "../component/complaint/ComplaintBox";
import MyHome from "../component/dashboardHome/home";
import AddNewPlan from "../component/plans/addNewPlan";
import PlanList from "../component/plans/planList";
import AddNewUserKYC from "../component/userList/addNewKYC";
import SubscriptionList from "../component/userList/subscriptionList";
import UserList from "../component/userList/userList";
import AgentList from "../component/agent/AgentList";
import AddNewAgent from "../component/agent/AddNewAgent";
import PaymentsHistory from "../component/payments/PaymentsHistory";
import NewPayment from "../component/payments/NewPayment";
import SignInCover1 from "../component/authentication/signIn";
import AgentPayout from "../component/agent/AgentPayout";

export const RouteData = [

    { path: `${import.meta.env.BASE_URL}`, element: <SignInCover1 />, title: 'Sign In' },

    // Dashboard content
    { path: `${import.meta.env.BASE_URL}home`, element: <MyHome />, title: 'Home' },
    { path: `${import.meta.env.BASE_URL}dashbord`, element: <MyHome />, title: 'Home' },

    // User-List content
    { path: `${import.meta.env.BASE_URL}user-list`, element: <UserList />, title: 'User List' },
    { path: `${import.meta.env.BASE_URL}user-new-kyc`, element: <AddNewUserKYC />, title: 'Add New User KYC' },
    { path: `${import.meta.env.BASE_URL}user-edit/:userId`, element: <AddNewUserKYC />, title: 'Edit User KYC' },
    { path: `${import.meta.env.BASE_URL}user-subscription/:userId`, element: <SubscriptionList />, title: 'Add New User KYC' },

    // plan-List content
    { path: `${import.meta.env.BASE_URL}plan-list`, element: <PlanList />, title: 'Plan' },
    { path: `${import.meta.env.BASE_URL}add-new-Plan`, element: <AddNewPlan />, title: 'Add New Plan' },
    { path: `${import.meta.env.BASE_URL}edit-plan/:planId`, element: <AddNewPlan />, title: 'Edit Plan' },

    // complaint content
    { path: `${import.meta.env.BASE_URL}complaint-box`, element: <ComplaintBox />, title: 'Complaint Box' },

    // Admin-List content
    { path: `${import.meta.env.BASE_URL}admin-list`, element: <AdminList />, title: 'Admin List' },
    { path: `${import.meta.env.BASE_URL}admin-new-kyc`, element: <AddNewKYCAdmin />, title: 'Add New Admin KYC' },

    // Payment content
    { path: `${import.meta.env.BASE_URL}payment-history`, element: <PaymentsHistory />, title: 'Agent' },
    { path: `${import.meta.env.BASE_URL}create-new-payment`, element: <NewPayment />, title: 'Add New Agent' },

    // Agent content
    { path: `${import.meta.env.BASE_URL}agent-list`, element: <AgentList />, title: 'Agent' },
    { path: `${import.meta.env.BASE_URL}add-new-agent`, element: <AddNewAgent />, title: 'Add New Agent' },
    { path: `${import.meta.env.BASE_URL}agent-payout/:agentId`, element: <AgentPayout />, title: 'Agent Payout' },

];
