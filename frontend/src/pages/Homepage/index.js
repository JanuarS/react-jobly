import React, { useContext, useEffect } from "react";
import axios from "axios";

import JoblyApi from "../../api";

import "./style.css";

const Homepage = () => {
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
  // axios.get('http://localhost:3001/companies')
  //   .then(function (response) {
  //     // handle success
  //   console.log(response.data);
  //   })
  //   .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });

  loadApi();

  }, []);

  const loadApi = async () => {
    const res = await JoblyApi.request("companies", {}, "get");
    console.log(res);
  }  

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
    </div>
  )
}

export default Homepage;