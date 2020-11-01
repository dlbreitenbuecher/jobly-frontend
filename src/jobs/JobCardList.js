import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyAPI from '../apis/JoblyAPI'
import SearchForm from '../common/SearchForm';

/**Renders a list of Job Cards
 * 
 * Props:
 * -Jobs [{id, title, salary, equity, companyHandle}]
 * - applyToJob (fn to change application state in App.js)
 *     (passed to JobCard)
 * 
 * State:
 * -searchTerm
 * -jobs
 * -isLoading
 * 
 * CompanyDetail -> JobCardList -> JobCard
 */

function JobCardList({ applyToJob }) {
  const [searchTerm, setSearchTerm] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  function search(searchTerms) {
    setSearchTerm(searchTerms);
  }

  useEffect(function fetchJobsWithSearchTerms() {
    async function fetchJobs() {
      try {
        const jobsRes = await JoblyAPI.getJobs(searchTerm);
        setJobs(jobsRes);
        setIsLoading(false);
      } catch (err) {
        console.log(err)
      }
    }
    fetchJobs();
  }, [searchTerm]);

  function renderJobs() {
    if (jobs.length > 0) {
      return (
        <div>
          {jobs.map(job => (
            <JobCard key={job.id} job={job} applyToJob={applyToJob} />
          ))}
        </div>
      )
    }else{
      return (
        <h2>No Results Found</h2>
      )
    }
  }
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className='JobCardList'>
      <SearchForm
        addSearchFilters={search}
        formInputNameAttr="title"
        redirectRoute="/jobs"
      />
      {renderJobs()}
    </div>
  )
}

export default JobCardList;