import {useEffect, useState} from 'react';
import API from "../api/axios";
import { toast } from "react-toastify";
import RegisterExpense from './RegisterExpense';

const Maintenance = () => {
    const [loading, setLoading] = useState(true);
    const [editedIssue, setEditedIssue] = useState(null);
    const [maintenanceIssue, setMaintenanceIssue] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [issueToDelete, setIssueToDelete] = useState(null);
    
    // Fetch issues from API
    const fetchIssues = async () => {
      try {
        await API
          .get("/maintenance/maintenance-requests")
          .then((res) => {
            setMaintenanceIssue(res.data);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to fetch maintenance issues");
          })
          .finally(setLoading(false));
      } catch (error) {
        console.log(error);
        toast.error("Error fetching maintenance issues");
      }
    };
  
    useEffect(() => {
      const fetchStaffs = async () => {
        try {
          await API
            .get("/maintenance/getstaffs")
            .then((res) => {
              setStaffs(res.data.staff);
            })
            .catch((err) => {
              console.log(err);
              toast.error("Failed to fetch staff list");
            })
            .finally(setLoading(false));
        } catch (error) {
          console.log(error);
          toast.error("Error fetching staff list");
        }
      };
  
      fetchIssues();
      fetchStaffs();
    }, []);
  
    const handleUpdateClick = (issue) => {
      setEditedIssue(issue);
    };
  
    const handleDeleteClick = (issue) => {
      setIssueToDelete(issue);
      setShowDeleteModal(true);
    };
  
    const handleConfirmDelete = async () => {
      try {
        await API.delete(`/maintenance/maintenance-requests/${issueToDelete._id}`);
        toast.success("Maintenance issue deleted successfully");
        fetchIssues();
        setShowDeleteModal(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete maintenance issue");
      }
    };
  
    const handleSave = async (issueId) => {
      try {
        const assignedTo = staffs.find((staff) => staff.username === selectedStaff)?._id;
        const id = issueId;
        
        await API
          .put("/maintenance/maintenance-requests/assign", {
            assignedTo,
            id
          })
          .then(() => {
            toast.success("Staff assigned successfully");
            fetchIssues();
            setEditedIssue(null);
            setSelectedStaff("");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to assign staff");
          })
          .finally(setLoading(false));
      } catch (error) {
        console.log(error);
        toast.error("Error assigning staff");
      }
    };
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                data-original="#000000"
              />
            </svg>
            Loading...
          </p>
        </div>
      );
    }
  
    return (
      <div className="max-w-7xl mx-auto p-6 bg-yellow-50">
         <RegisterExpense/>
        <h2 className="text-2xl font-bold text-yellow-800 mb-6">
          Maintenance Issues
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="bg-yellow-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Issue Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-200">
              {maintenanceIssue.map((issue) => (
                <tr key={issue._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      issue.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      issue.status === 'completed' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-yellow-900">{issue.issueDetails}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-yellow-900">
                      {issue.assignedTo == null ? "Not assigned" : 
                        staffs.find((staff) => staff._id === issue.assignedTo)?.username
                      }
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-yellow-900">{new Date(issue.createdAt).toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-yellow-600 text-white text-sm font-semibold rounded hover:bg-yellow-700"
                        onClick={() => handleUpdateClick(issue)}
                      >
                        Assign
                      </button>
                      <button
                        className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700"
                        onClick={() => handleDeleteClick(issue)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {editedIssue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">Assign Staff</h3>
              <div className="flex flex-col">
                <label htmlFor="staffs" className="text-yellow-700 mb-2">
                  Select Staff
                </label>
                <select
                  id="staffs"
                  value={selectedStaff}
                  onChange={(e) => setSelectedStaff(e.target.value)}
                  className="px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="">Select Staff</option>
                  {staffs.map((staff) => (
                    <option key={staff._id} value={staff.username}>
                      {staff.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700"
                  onClick={() => handleSave(editedIssue._id)}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
                  onClick={() => setEditedIssue(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
  
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-xl font-bold mb-4 text-yellow-800">Confirm Delete</h3>
              <p className="text-yellow-600 mb-6">
                Are you sure you want to delete this maintenance issue? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Maintenance;