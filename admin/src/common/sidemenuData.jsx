import React from "react";

//Svg icons of Dashboard

const dashboardSvg = <i className='ti ti-dashboard side-menu__icon'></i>

const usersSvg = <i className='ti ti-users side-menu__icon'></i>

const plansSvg = <i class="ti ti-discount-2 side-menu__icon"></i>

const complaintSvg = <i class="ti ti-message side-menu__icon"></i>

const reportMoneySvg = <i className='ti ti-report-money side-menu__icon'></i>

const agentUpSvg = <i className='ti ti-user side-menu__icon'></i>


export const MenuItems = [
	{
		id: 1,
		menutitle: "MAIN",
		Items: [

			{
				id: 2,
				path: `${import.meta.env.BASE_URL}dashbord`,
				icon: dashboardSvg,
				title: 'Dashboard',
				type: 'link',
				active: false,
				selected: false

			},
			{
				id: 5,
				icon: usersSvg,
				title: 'User List',
				type: 'sub',
				active: false,
				selected: false,
				children: [
					{
						id: 3,
						path: `${import.meta.env.BASE_URL}user-list`,
						type: 'link',
						active: false,
						selected: false,
						title: 'All Users'
					},
					{
						id: 4,
						path: `${import.meta.env.BASE_URL}user-new-kyc`,
						type: 'link',
						active: false,
						selected: false,
						title: 'Add Users'
					}
				]
			},
			{
				id: 5,
				icon: plansSvg,
				title: 'Plans',
				type: 'sub',
				active: false,
				selected: false,
				children: [
					{
						id: 3,
						path: `${import.meta.env.BASE_URL}plan-list`,
						type: 'link',
						active: false,
						selected: false,
						title: 'All Plans'
					},
					{
						id: 4,
						path: `${import.meta.env.BASE_URL}add-new-plan`,
						type: 'link',
						active: false,
						selected: false,
						title: 'Add New Plan'
					}
				]
			},
			{
				id: 5,
				icon: complaintSvg,
				title: 'Complaint',
				type: 'sub',
				active: false,
				selected: false,
				children: [
					{
						id: 4,
						path: `${import.meta.env.BASE_URL}complaint-box`,
						type: 'link',
						active: false,
						selected: false,
						title: 'Complaint Box'
					}
				]
			},
			{
				id: 5,
				icon: usersSvg,
				title: 'Admin List',
				type: 'sub',
				active: false,
				selected: false,
				children: [
					{
						id: 3,
						path: `${import.meta.env.BASE_URL}admin-list`,
						type: 'link',
						active: false,
						selected: false,
						title: 'All Admin'
					},
					{
						id: 4,
						path: `${import.meta.env.BASE_URL}admin-new-kyc`,
						type: 'link',
						active: false,
						selected: false,
						title: 'Add Admin'
					}
				]
			},
			{
				id: 5,
				icon: reportMoneySvg,
				title: 'Payment History',
				type: 'sub',
				active: false,
				selected: false,
				children: [
					{
						id: 3,
						path: `${import.meta.env.BASE_URL}payment-history`,
						type: 'link',
						active: false,
						selected: false,
						title: 'All Payments'
					},
					{
						id: 4,
						path: `${import.meta.env.BASE_URL}create-new-payment`,
						type: 'link',
						active: false,
						selected: false,
						title: 'New Payment'
					}
				]
			},
			{
				id: 5,
				icon: agentUpSvg,
				title: 'Agent',
				type: 'sub',
				active: false,
				selected: false,
				children: [
					{
						id: 3,
						path: `${import.meta.env.BASE_URL}agent-list`,
						type: 'link',
						active: false,
						selected: false,
						title: 'Agents'
					},
					{
						id: 4,
						path: `${import.meta.env.BASE_URL}add-new-agent`,
						type: 'link',
						active: false,
						selected: false,
						title: 'Add Agent'
					}
				]
			},
		]
	},

];
export default MenuItems
