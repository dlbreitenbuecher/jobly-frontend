import React, { useEffect, useState } from 'react';
import JoblyAPI from '../apis/JoblyAPI';
import CompanyCard from './CompanyCard'
import SearchForm from '../common/SearchForm'
import LoadingSpinner from '../common/LoadingSpinner';

/**Display list of company cards and searchbar (to filter displayed companies) 
 * 
 * State:
 * -searchFilters
 * -companies
 * -isLoading
 * 
 * Routes (/companies) -> CompanyList -> CompanyCard
*/
function CompanyList() {
  const [searchFilters, setSearchFilters] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function fetchCompaniesOnRender() {
    async function fetchCompanies() {
      try {
        const companies = await JoblyAPI.getCompanies(searchFilters);
        setCompanies(companies);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    }
    fetchCompanies();
  }, [searchFilters]);

  function addSearchFilters(formData) {
    setSearchFilters(formData)
  }

  function renderCompanies() {
    if (companies.length > 0) {
      return companies.map(company => (
        <div className='CompanyList-list'>
          <CompanyCard
            company={company} key={company.handle}
          />
        </div>
      ))
    } else {
      return (
        <h2>No Results Found</h2>
      )
    }
  }

  if (isLoading) return LoadingSpinner;

  return (
    <div className='CompanyList col-md-8 offset-md-2'>
      <SearchForm name='name'
        addSearchFilters={addSearchFilters}
        formInputNameAttr="name"
        redirectRoute="/companies"
      />
      {renderCompanies()}
    </div>
  )
}

export default CompanyList;