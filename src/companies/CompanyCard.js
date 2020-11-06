import React from 'react';
import { Link } from 'react-router-dom'
import './CompanyCard.css'

/**Renders details of the company
 * 
 * Accepts props :
 *  - company = {handle, name, description, logoUrl}
 * CompanyList -> CompanyCard -> view (companyCard)
 */
function CompanyCard({ company }) {
  return (
    <Link className="CompanyCard card" to={`/companies/${company.handle}`}>
      <div className="card-body">
        <h6 className="card-title">{company.name}
          <img src={company.logoUrl} className="float-right ml-5" alt=''></img>
        </h6>
        <p> <small>{company.description}</small></p>
      </div>
    </Link>
  )
}

export default CompanyCard;