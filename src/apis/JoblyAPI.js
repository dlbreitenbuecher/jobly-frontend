import axios from 'axios';

const BASE_URL =
  process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === 'get' ? data : {};
    // console.log('JoblyAPI.request url, headers, params:', url, headers, params)
    try {
      return (await axios({ url, method, data, params, headers }))
        .data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  //Company Methods

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies or Get some companies with filtered search.
   *
   * Params:
   * - object of optional search filters
   * {minEmployees, maxEmployees and  name} (will find case-insensitive, partial matches)
   *
   * Returns array of company objects
   * [ { handle, name, description, numEmployees, logoUrl }, ...]
   */

  static async getCompanies(searchData) {
    const res = await this.request(`companies/`, searchData);
    return res.companies;
  }

  /** Patch a company (identified by handle)
   *
   * Params:
   * - object of optional properties to update
   *    {name, description, numEmployees, logo_url}
   * - company handle
   *
   * Returns:
   * - company object
   *    { handle, name, description, numEmployees, logo_url }
   */

  static async updateCompany(handle, updateData) {
    const res = await this.request(
      `companies/${handle}`,
      updateData,
      'patch',
    );
    return res.company;
  }

  /** Delete a company
   *
   * Params:
   * - company handle
   *
   * Returns
   * - deleted company handle
   *    'handle'
   */

  static async deleteCompany(handle) {
    const res = await this.request(
      `companies/${handle}`,
      {},
      'delete',
    );
    return res.deleted;
  }

  //Job Methods

  /**  Get all jobs  or Get some jobs with filtered search
   *
   * Params:
   * - object of optional search filters
   *    {searchData: {minSalary, hasEquity and title}}
   *
   * Returns
   * - array of company objects
   *    [ { id, title, salary, equity, companyHandle, companyName }, ...]
   */

  static async getJobs(searchData) {
    const res = await this.request(`jobs/`, searchData);
    return res.jobs;
  }

  /**Get a specific Job object based on job id
   *
   * Params:
   * - job id
   *
   * Returns
   * - job obejct
   *    { id, title, salary, equity, company }
   *          where company is { handle, name, description, numEmployees, logoUrl }
   */
  static async getJob(id) {
    const res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Patch a job
   *
   * Params:
   * - object of optional properties to update
   *    {updateData: { title, salary, hasEquity }}
   *
   * Returns
   * - updated job object
   *    { id, title, salary, equity, companyHandle }
   */
  static async updateJob(id, updateData) {
    const res = await this.request(`jobs/${id}`, updateData, 'patch');
    return res.job;
  }

  /**Delete Job
   *
   * Params:
   * - job id
   *
   * Returns
   * - deleted job id
   *    'id'
   */
  static async deleteJob(id) {
    const res = await this.request(`jobs/${id}`, {}, 'delete');
    return res.job;
  }

  // Auth Methods

  /**Register a standard User
   *
   * Params:
   * - object of userData
   *  { username, password, firstName, lastName, email }
   *
   * Returns:
   * - JWT token (used to authenticate future requests)
   */
  static async registerUser(userData) {
    const res = await this.request(`auth/register`, userData, 'post');
    return res.token;
  }

  /**User login
   *
   * Params:
   * - object of userData
   *    { username, password }
   *
   * Returns
   * - JWT token (used to authenticate future requests)
   */
  static async loginUser(userData) {
    const res = await this.request(`auth/token`, userData, 'post');
    return res.token;
  }

  // User Methods

  /**Register an Admin
   *
   * Params:
   * - object of adminData
   *    { username, password, firstName, lastName, email }
   *
   * Returns
   *  - object with user and token objects
   *    {
   *      user: { username, firstName, lastName, email, isAdmin },
   *      token : ""
   *    }
   */
  static async registerAdmin(adminData) {
    const res = await this.request(`users/`, adminData, 'post');
    return res;
  }

  /** Get all Users
   *
   * Returns
   * - array of user objects
   *    [ {username, firstName, lastName, email }, ... ]
   */
  static async getUsers() {
    const res = await this.request(`users/`);
    return res.users;
  }

  /** Get a User
   *
   * Params:
   * - username
   *
   * Returns
   * - user object & associated jobs
   *    { username, firstName, lastName, isAdmin, jobs }
   *        where jobs is { id, title, companyHandle, companyName, state }
   */
  static async getUser(username) {
    const res = await this.request(`users/${username}`, {
      username: username,
    });
    return res.user;
  }

  /** Update a User
   *
   * Params:
   * - username
   * - userData =  { firstName, lastName, password, email }
   *
   * Returns
   * - { username, firstName, lastName, email, isAdmin }
   */
  static async updateUser(username, userData) {
    const res = await this.request(
      `users/${username}`,
      userData,
      'patch',
    );
    return res.user;
  }

  /** Delete a User
   *
   * Params:
   * - username
   *
   * Returns
   * -  { username }
   */
  static async deleteUser(username) {
    const res = await this.request(`users/${username}`, {}, 'delete');
    return res.deleted;
  }

  /** Apply for a Job
   *
   * Params:
   * - username
   * - jobId
   *
   * Returns
   * -  { jobId }
   */
  static async applyForJob(username, jobId) {
    const res = await this.request(
      `users/${username}/jobs/${jobId}`,
      {},
      'post',
    );
    console.log(
      'In JoblyAPI. applyForJob returns {jobId}:',
      res.applied,
    );
    return res.applied;
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

JoblyApi.token = localStorage.getItem('token');

export default JoblyApi;
