import React, {useEffect, useState} from "react";
import JoblyApi from "../../api";
import SearchForm from "../../components/SearchForm";
import JobCardList from "../../components/JobCardList";
import LoadingSpinner from "../../components/LoadingSpinner";

import "./style.css";

const Jobs = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    search();
  }, []);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  if (!jobs) return <LoadingSpinner />

  return (
    <div className="JobList col-md-8 offset-md-2">
        <SearchForm searchFor={search} />
        {jobs.length
            ? <JobCardList jobs={jobs} />
            : <p className="lead">Sorry, no results were found!</p>
        }
      </div>
  );
}

export default Jobs; 