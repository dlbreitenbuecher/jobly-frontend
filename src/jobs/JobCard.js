import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../auths/CurrentUserContext';
import './JobCard.css';

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
  const { hasApplicationID, applyToJob } = useContext(
    CurrentUserContext,
  );
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
      <div className='card-body'>
        <h6 className='card-title text-left lead'>{job.title}</h6>
        {job.companyName ? (
          <h4 className='text-left pt-1'>
            <Link to={`/companies/${job.companyHandle}`}>
              {job.companyName}
            </Link>
          </h4>
        ) : null}
        <p className='text-left pt-2'>
          Salary: {job.salary ? job.salary : 0}
        </p>

        <button
          className='btn btn-danger font-weight-bold text-uppercase float-right'
          disabled={applied}
          onClick={handleClick}
        >
          {applied ? 'Applied' : 'Apply'}
        </button>

        <p className='text-left small'>
          Equity: {job.equity ? job.equity : 0}
        </p>
      </div>
    </div>
  );
}

export default JobCard;
