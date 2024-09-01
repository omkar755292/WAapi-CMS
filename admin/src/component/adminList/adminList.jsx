import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";


const AdminList = () => {
  return (
    <div>
      <PageHeader currentpage="User Data" activepage="Home" mainpage="User Data" />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <div className="box xl:overflow-auto">
            <div className="box-header">
              <h5 className="box-title">User Data List</h5>
            </div>
            <div className="box-body">
              <button
                // onClick={handleAddButtonClick}
                style={{
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                Add New Admin
              </button>
              <div className="overflow-auto table-bordered">
                <div className='app-container'>
                  <table
                    id='user-datatable'
                    className='ti-custom-table ti-striped-table ti-custom-table-hover'
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>WhatsApp Number</th>
                        <th>Barcode</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {users.map(user => (
                        <Fragment key={user._id}>
                          <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.whatsappNumber}</td>

                            <td><img
                              src={api + '/barcode/' + user.userId}
                              alt="Description of the image"
                              style={{ width: '250px', height: '40px' }}
                            />
                              {user.barcode}
                            </td>
                            <td>
                              <button onClick={() => handleRoll(user.userId)} style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '10px'
                              }}>Roll</button>

                              <button onClick={() => handleEdit(user.userId)} style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '10px'
                              }}>Edit</button>
                              <button
                                onClick={() => handleDownload(user.uid, user.name, user.phoneNumber)}
                                type="button"
                                className="ti-btn rounded-full ti-btn-warning">
                                download
                              </button>

                            </td>
                          </tr>
                        </Fragment>
                      ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminList