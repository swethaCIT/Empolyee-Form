import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dashboard", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Corrected backticks here
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login"); // Redirect to login if there's an error
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {userDetails ? (
        <div>
          <h1>Welcome, {userDetails.name}</h1>
          <p>Employee ID: {userDetails.employee_id}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Department: {userDetails.department}</p>
          <p>Date of Joining: {userDetails.doj}</p>
          <p>Role: {userDetails.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
