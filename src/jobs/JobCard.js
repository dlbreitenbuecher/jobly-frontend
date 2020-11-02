import React, { useContext, useEffect, useState } from 'react';
import CurrentUserContext from '../auths/CurrentUserContext';

/**Display JobCard
 * Details the job title, company name, salary, and equity. 
 * Allows a user to apply for a job
 * 
 * Props:
 * - job {id, title, salary, equity, companyHandle}
 * 
 * Context:
 * - hasApplicationID: 
 *      fn that returns true if user has already applied for job
 *      otherwise returns false
 * 
 * - applyToJob: 
 *      fn that updates both the database and the applicationIDs state
 *      in App.js
 * 
 * JobCardList -> JobCard
 */
function JobCard({ job }) {
  const { hasApplicationID, applyToJob } = useContext(CurrentUserContext);
  const [applied, setApplied] = useState(hasApplicationID(job.id));

  async function handleClick() {
    const result = await applyToJob(job.id);
    if (result.success) {
      setApplied(true);
    } else {
      console.error(result.errors);
    }
  }

  return (
    <div className='JobCard card'>
      <div className="card-body">
        <h6 className="card-title">{job.title}</h6>
        {job.companyName 
          ? <h2>{job.companyName}</h2> 
          : null}
        <p>Salary: {job.salary}</p>
        <p>Equity: {job.equity ? job.equity : 0}</p>

        {!applied
          ? <button onClick={handleClick}>Apply</button>
          : <button disabled>Applied</button>}
      </div>
    </div>
  )
}

export default JobCard;