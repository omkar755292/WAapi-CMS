import React, { useEffect, useState, useRef } from 'react';
import PageHeader from '../../layout/layoutsection/pageHeader/pageHeader';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import axios from 'axios';
import { api } from '../../GlobalKey/GlobalKey';
import FileUploadComponent from '../customeComponent/fileUpload';
import Swal from 'sweetalert2';

const ComplaintBox = () => {
    const [complaintData, setComplaintData] = useState('');
    const [loading, setLoading] = useState(false);
    const [complaintList, setComplaintList] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const editorRef = useRef(null);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${api}/api/complaint/all-complaint-data`);
            // Convert HTML to plain text for each complaint
            const formattedComplaints = response.data.map(complaint => ({
                ...complaint,
                complaintData: convertHtmlToPlainText(complaint.complaintData)
            }));
            setComplaintList(formattedComplaints);
        } catch (error) {
            console.error('Error fetching complaints:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to fetch complaints. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleComplaintSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${api}/api/complaint/add-new-complaint`, {
                complaintData,
                filesData: uploadedFiles  // Pass uploaded files to the server
            });
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message
            });
            fetchComplaints(); // Fetch new complaints after submission
            clearForm(); // Clear form fields and editor
        } catch (error) {
            console.error('Error submitting complaint:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to submit complaint. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const convertHtmlToPlainText = (html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.textContent || tempElement.innerText || '';
    };

    const handleFilesUploaded = (files) => {
        setUploadedFiles(files);
    };

    const clearForm = () => {
        setComplaintData('');
        setUploadedFiles([]);
        if (editorRef.current && editorRef.current.editor) {
            editorRef.current.editor.setContents('');
        }
    };

    const handleViewComplaint = (complaint) => {
        let filesHtml = '';
        if (complaint.files && complaint.files.length > 0) {
            filesHtml = `<div style="text-align: left;"><strong>Files:</strong><ul>`;
            complaint.files.forEach(file => {
                filesHtml += `<li>${file.filename}</li>`;
            });
            filesHtml += `</ul></div>`;
        }
    
        Swal.fire({
            title: 'Complaint Details',
            html: `<div style="text-align: left;"><strong>Complaint:</strong> ${complaint.complaintData}</div>` +
                `<div style="text-align: left;"><strong>Date:</strong> ${new Date(complaint.createdDate).toLocaleDateString()}</div>` +
                `<div style="text-align: left;"><strong>Status:</strong> ${complaint.status}</div>` +
                filesHtml,
            confirmButtonText: 'Close',
            width: 'auto'
        });
    };
    

    return (
        <div>
            <PageHeader currentpage="Add New Plan" activepage="Home" mainpage="Complaint Box" />
            <div className="grid grid-cols-12 gap-x-6">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form onSubmit={handleComplaintSubmit}>
                                <div className="grid lg:grid-cols-1 gap-6 space-y-4 lg:space-y-0">
                                    <div className="space-y-2">
                                        <label className="ti-form-label mb-0">Complaint Box</label>
                                        <SunEditor
                                            ref={editorRef}
                                            value={complaintData}
                                            onChange={setComplaintData}
                                            setOptions={{
                                                buttonList: [
                                                    ["undo", "redo"],
                                                    ["font", "fontSize"],
                                                    ['paragraphStyle', 'blockquote'],
                                                    [
                                                        "bold",
                                                        "underline",
                                                        "italic",
                                                        "strike",
                                                        "subscript",
                                                        "superscript"
                                                    ],
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
                                </div>
                                <div>
                                    <FileUploadComponent onFilesUploaded={handleFilesUploaded} />
                                </div>
                                <button type="submit" className="ti-btn ti-btn-primary my-2" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="box xl:overflow-auto">
                        <div className="box-header">
                            <h5 className="box-title">Complaint List</h5>
                        </div>
                        <div className="box-body">
                            <div className="overflow-auto table-bordered">
                                <div className='app-container'>
                                    {loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        <table
                                            id='user-datatable'
                                            className='ti-custom-table ti-striped-table ti-custom-table-hover'
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Complaint</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {complaintList.map((complaint) => (
                                                    <tr key={complaint._id}>
                                                        <td>{complaint.complaintData}</td>
                                                        <td>{new Date(complaint.createdDate).toLocaleDateString()}</td>
                                                        <td>{complaint.status}</td>
                                                        <td>
                                                            <button onClick={() => handleViewComplaint(complaint)} className="ti-btn ti-btn-secondary">View</button>
                                                            <button className="ti-btn ti-btn-danger">Close</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComplaintBox;
