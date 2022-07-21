import React, { useContext, useEffect, useState } from "react";
import CompanyCard from "../../components/CompanyCard";
import axios from "axios";

import JoblyApi from "../../api";

import "./style.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
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
    setCompanies(res.companies)
  }  

  // return (
  //   <div className="Homepage">
  //     {companies.map(company => {
  //       return <div key={company.handle}>
  //         <p>{company.name}</p>
  //       </div>
        
  //     })}
  //   </div>
  // )

  return (
    <div className="Homepage">
      {companies.map(company => ( 
        <CompanyCard
            key={company.handle}
            handle={company.handle}
            name={company.name}
            description={company.description}
            logoUrl={company.logoUrl}
        />
      ))}
    </div>
  )
}

export default Companies;