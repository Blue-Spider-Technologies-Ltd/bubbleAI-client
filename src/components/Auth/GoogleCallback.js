import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Fetching } from "../UI/Modal/Modal";

const GoogleCallback = () => {
    const location = useLocation()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        console.log(code);
        const response = await axios.get("/auth/google/callback");
        console.log(response.data); // Handle response data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <Fetching />; // or any UI component if needed
};

export default GoogleCallback;