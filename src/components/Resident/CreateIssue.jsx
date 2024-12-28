import  { useState } from "react";
import API from "../../api/axios"
const CreateIssue = ({ residentId }) => {
  const [issueDetails, setIssueDetails] = useState("");
  const [priority, setPriority] = useState("Low");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIssue = { residentId, issueDetails, priority };
    console.log(newIssue);
    try {
      await API.post("/maintenance/create-maintenance-requests", newIssue);

      console.log("Issue reported successfully!");
      alert("Issue reported successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Report an Issue</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Resident ID Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resident ID
          </label>
          <input
            type="text"
            value={residentId || ""}
            readOnly
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none"
          />
        </div>

        {/* Issue Details Field */}
        <div>
          <label
            htmlFor="issueDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Issue Details
          </label>
          <textarea
            id="issueDetails"
            value={issueDetails}
            onChange={(e) => setIssueDetails(e.target.value)}
            required
            placeholder="Describe the issue..."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Priority Select Field */}
        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-blue-700"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
};




export default CreateIssue;