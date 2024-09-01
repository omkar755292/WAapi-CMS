import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { api } from '../../GlobalKey/GlobalKey';

const FileUploadComponent = ({ onFilesUploaded }) => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        try {
            const response = await axios.post(api + '/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Files uploaded successfully:', response.data);

            Swal.fire({
                title: 'Success',
                text: 'Files uploaded successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Pass uploaded files back to parent component
            onFilesUploaded(response.data.files);
            console.log(response.data.files);

        } catch (error) {
            console.error('Error uploading files:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to upload files. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto mt-4 mb-2 inline-block align-top">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">Upload Files</h2>
            <div className="space-y-2 inline-flex items-center">
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="text-sm text-gray-500 
                    file:mr-2 file:py-1 file:px-2
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100"
                />
                <button
                    type="button" // Change type to button to prevent form submission
                    onClick={handleSubmit} // Handle upload directly
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    );
};

export default FileUploadComponent;
