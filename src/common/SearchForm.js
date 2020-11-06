import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'

/**Renders search form
 * 
 * Props:
 * - addSearchFilters (updates state in parent)
 * -formInputNameAttr - input name attribute for the Search form
 * -redirectRoute - saves the history and redirects to this route
 * 
 * State:
 * -formData
 * 
 * { CompanyList, JobsList } -> SearchForm
 */
//TODO:improve comments about props and historyRoute
function SearchForm({ addSearchFilters, formInputNameAttr, redirectRoute }) {
  const [formData, setFormData] = useState({});
  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    addSearchFilters(formData);
    setFormData({});
    history.push({redirectRoute})
  }

  return (
    <div className='SearchForm my-4 '>
      <form 
        onSubmit={handleSubmit} 
        className='form-inline'
      >
          <input 
            type='text'
            name={formInputNameAttr}
            value={formData.name}
            placeholder='Enter a search term...'
            onChange={handleChange}
            className='form-control form-control-lg flex-grow-1'
          />
        <button className="btn btn-lg btn-primary">Search</button>
      </form>
    </div>
  )
}

export default SearchForm

 