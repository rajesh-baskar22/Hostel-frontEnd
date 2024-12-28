import {useEffect ,useState} from 'react';
import LineChart from "../ChartsAndGraphs/LineChart";
import InfoContainer from "../components/InfoContainer";
import API from "../api/axios"
import BarChart from "./RegisterExpense"


function AdminDash() {
  const [dashboardData, setDashboardData] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    // console.log(dashboardData);
  }, [dashboardData]);
  useEffect(()=>{
    console.log(revenueData);
    console.log(expensesData)    
  },[revenueData,expensesData])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/dashboard");
        setDashboardData(response.data);
        setRevenueData(response.data.revenueData.reveData);
        setExpensesData(response.data.expensesData.expenseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      {dashboardData ? (
        <div>
          <section className="flex gap-4">
            <div className="shadow-lg p-10">
              <LineChart revenueData={revenueData} expensesData={expensesData} />
            </div>
            <div className="w-full bg-yellow-50 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-yellow-800">
                  Staff Members
                </h1>
                <span className="text-sm text-yellow-600">
                  {dashboardData.staffData.staffNames.length} Active
                </span>
              </div>
              <hr className="mb-6 border-yellow-200" />
              <div className="space-y-4">
                {dashboardData.staffData.staffNames.map((name, index) => (
                  <div                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-yellow-800 font-medium">{name}</h3>
                        <p className="text-sm text-yellow-500">Staff Member</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>          <hr className="mt-10" />
          <section className="flex gap-1">
            <div className="flex mt-1">
              <InfoContainer
                value={dashboardData.roomData.netWorth}
                title={"Net Profit"}
                icon={
                  <span className="absolute right-0 bottom-10 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                }
              />
              <InfoContainer
                value={dashboardData.expensesData.totalExpenses}
                title={"Expense"}
                icon={
                  <span className="absolute right-0 bottom-10 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                }
              />
              <InfoContainer
                color={"blue"}
                value={dashboardData.revenueData.totalRevenue}
                title={"Revenue"}
                icon={
                  <span className="absolute right-0 bottom-10 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                }
              />{" "}
            </div>
            <div className="grid grid-cols-1 gap-4 p-4">
              <div className="bg-red-400 rounded-lg shadow-lg p-6 flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-thin text-gray-800 mb-3">Room Statistics</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div className="bg-yellow-200 p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-gray-700 text-sm font-medium mb-2">Total Rooms</p>
                      <p className="text-3xl font-bold text-blue-600">{dashboardData.roomData.totalRooms}</p>
                    </div>
                    <div className="bg-blue-200 p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-gray-700 text-sm font-medium mb-2">Occupied Rooms</p>
                      <p className="text-3xl font-bold text-green-600">{dashboardData.roomData.occupiedRooms}</p>
                    </div>
                    <div className="bg-pink-200 p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-gray-700 text-sm font-medium mb-2">Available Rooms</p>
                      <p className="text-3xl font-bold text-yellow-600">{dashboardData.roomData.availableRooms}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-gray-700 text-sm font-medium mb-2">Active Assignments</p>
                      <p className="text-3xl font-bold text-purple-600">{dashboardData.roomData.activeAssignments}</p>
                    </div>
                    <div className="bg-brown p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <p className="text-gray-700 text-sm font-medium mb-2">Inactive Assignments</p>
                      <p className="text-3xl font-bold text-red-600">{dashboardData.roomData.inActiveAssignments}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>          </section>
          {/* <BarChart/> */}
        </div>
      ) : null}
    </>
  );
}
export default AdminDash
