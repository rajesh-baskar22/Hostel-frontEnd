// import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateIssue from "../components/Resident/CreateIssue";
import ResidentRequestStatus from "../components/Resident/ResidentRequestStatus";
import SidePanel from "../components/SidePanel";
import { useState, useMemo } from "react";
import RoomDetails from "../components/Resident/RoomDetails";
import Invoice from "../components/BillingAndPayment/Invoice";
import Payment from "../components/BillingAndPayment/PayPalButton";
import AccountDetails from "../components/Resident/AccountDetails"
import {
  HomeIcon,
  UserIcon,
  KeyIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  WrenchIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
function ResidentPage() {
  const icons = {
    dashboard: <HomeIcon className="h-8 w-6 text-blue-500" />,
    account: <UserIcon className="h-8 w-6 text-yellow-500" />,
    room: <KeyIcon className="h-8 w-6 text-yellow-500" />,
    createRoom: <PlusCircleIcon className="h-8 w-6 text-red-500" />,
    assignRoom: <BriefcaseIcon className="h-8 w-6 text-lime-500" />,
    maintenance: <WrenchIcon className="h-8 w-6 text-gray-500" />,
    form: <ClipboardDocumentIcon className="h-8 w-6 text-blue-500" />,
  };
const [options] = useState([
  { name: "Room Details", link: "/resident", icon:icons.room  },
  { name: "Create Issue", link: "/resident/create-issue", icon: icons.createRoom },
  {
    name: "Request Status",
    link: "/resident/resident-request-status",
    icon: icons.form,
  },
]);
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
  },[])
  return (
    <div className="flex gap-5 bg-[#f5f7f9] m-2 rounded-tl-3xl ">
    <SidePanel options={options} username={username} useremail={useremail}/>
    <div className="bg-white p-5 mt-5 w-[70rem] h-[42rem] border-2  overflow-y-scroll rounded-tl-3xl">
      <Routes>
        <Route
          path="/create-issue"
          element={<CreateIssue residentId={residentId} />}
        />
        <Route
          path="/resident-request-status"
          element={<ResidentRequestStatus residentId={residentId} />}
        />
        <Route
          path="/invoice/:residentId"
          element={<Invoice residentId={residentId} />}
        />
        <Route path="/payment/:residentId" element={<Payment />} />
        <Route
          path="/account"
          element={<AccountDetails residentId={residentId} role={role} />}
        />
        <Route path="/" element={<RoomDetails residentId={residentId} username={username}/>} />
      </Routes>
    </div>
  </div>
  );
}

export default ResidentPage;