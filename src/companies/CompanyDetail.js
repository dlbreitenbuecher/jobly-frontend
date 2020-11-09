import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyAPI from '../apis/JoblyAPI';
import JobCard from '../jobs/JobCard';
import LoadingSpinner from '../common/LoadingSpinner';

/**Displays company details and avaialable jobs */
function CompanyDetail() {
  const { companyName } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchCompanyOnRender() {
      async function fetchCompany() {
        const company = await JoblyAPI.getCompany(companyName);
        setCompany(company);
        setIsLoading(false);
      }
      fetchCompany();
    },
    [companyName],
  );

  function renderJobs() {
    const jobs = company.jobs;

    return (
      <div>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      {renderJobs()}
    </div>
  );
}

export default CompanyDetail;
