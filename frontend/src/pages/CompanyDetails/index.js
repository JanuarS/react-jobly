import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import JobCardList from "../../components/JobCardList";
// import CompanyCard from "../../components/CompanyCard";

function CompanyDetails() {
  const { handle } = useParams();

  let [company, setCompany] = useState(handle);

  useEffect(() => {
    async function getCompany() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
      // console.debug(company.jobs);
      let jobs = company.jobs;
      console.debug(jobs);
    }
    
    getCompany();
  }, [handle]);


  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetails;
