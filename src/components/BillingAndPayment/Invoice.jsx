 import{useState , useEffect} from "react";
import logo from "../../assets/image2.png";
import {  useNavigate } from "react-router-dom";
import API from  "../../api/axios"
import PayPalButton from "./PayPalButton";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Invoice = ({ residentId }) => {
  console.log(residentId);
  const [invoiceData, setInvoiceData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoiceData = async () => {
    
      try {
        const response = await API.get(`/resident/invoice/${residentId}`);
        setInvoiceData(response.data.invoiceDetails);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        navigate("/resident");
      }
    };

  
      fetchInvoiceData();
   
  }, [residentId]);

  return (
    <>
    {!invoiceData ? (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    ) : (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl shadow-2xl p-8 max-w-2xl mx-auto my-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-yellow-200 pb-4">
        <div className="flex items-center space-x-3">
          <img className="h-12 w-12 rounded-lg shadow-md" src={logo} alt="Logo" />
          <div className="text-yellow-800 font-bold text-2xl tracking-wide">Vista</div>
        </div>
        <div className="text-right">
          <div className="text-yellow-800 font-bold text-2xl mb-2">INVOICE</div>
          <div className="text-yellow-700 text-sm">
            Date: {new Date(invoiceData.invoiceDate).toLocaleDateString()}
          </div>
          <div className="text-yellow-700 text-sm font-medium">
            Invoice #{invoiceData.invoiceNumber}
          </div>
        </div>
      </div>
      {/* Hostel and Resident Information */}
      <div className="grid grid-cols-2 gap-8 text-sm mb-6 bg-yellow-50 p-6 rounded-lg shadow-sm">
        <div className="border-r border-yellow-200 pr-6">
          <h2 className="font-bold mb-3 text-yellow-800 text-lg">Hostel Details</h2>
          <div className="space-y-2">
            <div className="flex items-center text-yellow-700">
              <span className="font-medium">Vista Hostel</span>
            </div>
            <div className="flex items-center text-yellow-700">
              <span>SinMing Road,GardenAtBishan,Singapore</span>
            </div>
            <div className="flex items-center text-yellow-700">
              <span>support@Vista.com</span>
            </div>
          </div>
        </div>
        <div className="pl-6">
          <h2 className="font-bold mb-3 text-yellow-800 text-lg">Bill To</h2>
          <div className="space-y-2">
            <div className="flex items-center text-yellow-700">
              <span className="font-medium">{invoiceData.username}</span>
            </div>
            <div className="flex items-center text-yellow-700">
              <span>Room: {invoiceData.roomNumber}</span>
            </div>
            <div className="flex items-center text-yellow-700">
              <span>{invoiceData.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm bg-yellow-50 rounded-lg">
          <thead>
            <tr className="bg-yellow-100">
              <th className="py-3 px-4 text-left text-yellow-800 font-semibold rounded-tl-lg">Description</th>
              <th className="py-3 px-4 text-right text-yellow-800 font-semibold rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700">Room Fees</td>
              <td className="py-3 px-4 text-right text-yellow-700">${invoiceData.roomfees}</td>
            </tr>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700">Washing</td>
              <td className="py-3 px-4 text-right text-yellow-700">${invoiceData.washing}</td>
            </tr>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700">Electricity</td>
              <td className="py-3 px-4 text-right text-yellow-700">${invoiceData.electricity}</td>
            </tr>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700">Water</td>
              <td className="py-3 px-4 text-right text-yellow-700">${invoiceData.water}</td>
            </tr>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700">Internet</td>
              <td className="py-3 px-4 text-right text-yellow-700">${invoiceData.internet}</td>
            </tr>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700">Maintenance</td>
              <td className="py-3 px-4 text-right text-yellow-700">${invoiceData.maintenance}</td>
            </tr>
            <tr className="hover:bg-yellow-100 transition-colors">
              <td className="py-3 px-4 text-yellow-700 rounded-bl-lg">Cleaning</td>
              <td className="py-3 px-4 text-right text-yellow-700 rounded-br-lg">${invoiceData.cleaning}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Totals */}      
      <div className="bg-yellow-50 rounded-lg p-4 mt-4">
        <div className="text-sm text-yellow-800">
          <div className="flex justify-between py-2 border-b border-yellow-200">
            <span className="font-medium">Subtotal:</span>
            <span>${invoiceData.subTotal}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-yellow-200">
            <span className="font-medium">Tax:</span>
            <span>${invoiceData.tax}</span>
          </div>
          <div className="flex justify-between py-2 font-bold text-base">
            <span>Total:</span>
            <span>${invoiceData.total}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-full max-w-md">
          <PayPalButton invoiceDetails={invoiceData} />
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-yellow-50 rounded-lg p-4 mt-8">
        <div className="text-sm text-yellow-700 space-y-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"/>
            </svg>
            <span>Payment is due within 20 days. Late payments are subject to a 5% fee.</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            <span>Queries: billing@Vistahosteledge.com</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
            </svg>
            <span>Thank you for staying with VistaHostel</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
    )}
    </>
  );
};

import PropTypes from 'prop-types';

Invoice.propTypes = {
  residentId: PropTypes.string.isRequired,
};


export default Invoice;