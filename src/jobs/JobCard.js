import React, { useContext, useState } from 'react';
import CurrentUserContext from '../auths/CurrentUserContext';

/**Display JobCard
 * Details the 
 * 
 * Props:
 * - job {id, title, salary, equity, companyHandle}
 * - applyToJob (fn to change application state in App.js)
 * 
 * Context: CurrentUserContext - applications
 *    Where applications is { job_id: true,... }
 * 
 * JobCardList -> JobCard
 */
function JobCard({ job, applyToJob }) {
  const { applications } = useContext(CurrentUserContext);
  const [applied, setApplied] = useState((job.id in applications));

  // console.log('applications in JobCard', applications);
  // console.log('applied in JobCard', applied);

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
        {job.companyName ? <h2>{job.companyName}</h2> : null}
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