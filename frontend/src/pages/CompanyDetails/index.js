import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../../api";
import CompanyCard from "../../components/CompanyCard";

function CompanyDetails() {
  const { handle } = useParams();

  let [company, setCompany] = useState(handle);

  useEffect(() => {
    async function getCompany() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    
    getCompany();
  }, []);


  return (
    <div className="CompanyDetail">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
    </div>
  );
}

export default CompanyDetails;
