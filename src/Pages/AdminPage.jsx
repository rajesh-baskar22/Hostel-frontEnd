import {useState, useMemo} from 'react';

import AdminDash from "../components/AdminDash";
import {Routes,Route} from "react-router-dom";
import RoomForm from "../components/RoomForm";
import Rooms from "../components/Rooms";
import Maintenance from '../components/Maintenance';
import RoomBooking from '../components/RoomBooking';
import SidePanel from '../components/SidePanel';


import {
  HomeIcon,
  UserIcon,
  KeyIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  WrenchIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import AccountDetails from "../components/Resident/AccountDetails";
import Payment from "../components/Payments";
import ManageAssignments from '../components/ManageAssignments';

function AdminPage() {
  const[currentDate, setCurrentDate] = useState("");

  const icons = {
    dashboard: <HomeIcon className="h-6 w-6 text-gray-500" />,
    account: <UserIcon className="h-6 w-6 text-gray-500" />,
    room: <KeyIcon className="h-6 w-6 text-gray-500" />,
    createRoom: <PlusCircleIcon className="h-6 w-6 text-gray-500" />,
    assignRoom: <BriefcaseIcon className="h-6 w-6 text-gray-500" />,
    maintenance: <WrenchIcon className="h-6 w-6 text-gray-500" />,
    form: <ClipboardDocumentIcon className="h-6 w-6 text-gray-500" />,
  };


  const [options] = useState([
    { name: "Admin Dashboard", link: "/admin", icon: icons.dashboard },
    { name: "Room Form", link: "/admin/roomform", icon: icons.form },
    { name: "Rooms", link: "/admin/rooms" , icon: icons.room},
    { name: "Maintenance", link: "/admin/maintenance" , icon: icons.maintenance},
    { name: "Payments", link: "/admin/payments" , icon: icons.form},
    { name: "Manage Assignments", link: "/admin/manageassignment" , icon: icons.assignRoom},
  ]);

  //real-time date and time display function
  
  const updateDate = () => {
    setCurrentDate( new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  };

  setInterval(updateDate, 1000);
  const username = useMemo(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData ? userData.username : "username";
    }, []);
  
  const useremail = useMemo(() => {
      const userInfo = JSON.parse(localStorage.getItem("userData"));
      console.log(userInfo);
      
      return userInfo ? userInfo.email : "useremail";
    }, []);
    
   const residentId = useMemo(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData ? userData.userid : "id not found";
    }, []);
   const role = useMemo(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData ? userData.role : "role not found";
    }, []);
  

  return (
    <div className="flex gap-5 bg-gradient-to-br from-blue-200 to-pink-200 m-2 rounded-tl-3xl shadow-sm">
      <SidePanel options={options} username={username} useremail={useremail} />
      <div className="bg-yellow-300 p-6 mt-5 min-w-[75rem] max-h-[43rem] border border-violet-200 rounded-tl-3xl overflow-y-scroll shadow-lg">
        <div className="mb-4">
          <span className="flex items-center gap-3">
            <h3 className="text-2xl font-bold mb-1 text-red-800">Welcome back, {username}!</h3> 
            <span className="uppercase text-xs font-medium text-emerald-700 bg-emerald-100 px-4 py-1.5 rounded-full">{role}</span>
          </span>
          <p className="text-red-600 text-sm mt-2">
            {currentDate}
          </p>
          <hr className="my-4 border-violet-200" />
        </div>
       
        <Routes>
          <Route path="/roomform" element={<RoomForm />} />
          <Route path="/" element={<AdminDash />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/rooms/book-room/:roomid" element={<RoomBooking />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/manageassignment" element={<ManageAssignments />} />
          <Route
            path="/account"
            element={<AccountDetails residentId={residentId} role={role} />}
          />
        </Routes>
      </div>
    </div>  );
}

export default AdminPage;