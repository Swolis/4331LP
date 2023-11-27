import React, { Component } from 'react';
import handleRegistration from '../../handlers/RegistrationHandler';

import '../../styles/RegistrationFrom.css'

class RegistrationForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        businessName: '',
        businessEmail: '',
        businessPhone: '',
        address: '',
        username: '',
        password: '',
      };
    }
  
    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
      
      handleSubmit = (event) => {
        event.preventDefault();
        handleRegistration(this.state);
      };

  
    render() {
      return (
        <form className='mx-auto gap-6 w-5/6 object-contain p-10 flex flex-col items-center' onSubmit={this.handleSubmit}>
          <div className='form-group w-full'>
            <label></label>
            <input
              className='mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner p-1 px-4'
              type='text'
              name='businessName'
              placeholder='Business Name'
              value={this.state.businessName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-full'>
            <label></label>
            <input
              className='mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner p-1 px-4'
              type='text'
              name='businessEmail'
              placeholder='Business Email'
              value={this.state.businessEmail}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-full'>
            <label></label>
            <input
              className='mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner p-1 px-4'
              type='text'
              name='businessPhone'
              placeholder='Business Phone Number'
              value={this.state.businessPhone}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-full'>
            <label></label>
            <input
              className='mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner p-1 px-4'
              type='text'
              name='address'
              placeholder='Address'
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group  w-full'>
            <label></label>
            <input
              className='mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner border-opacity-.5 p-1 px-4'
              type='text'
              name='username'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-full'>
            <label></label>
            <input
              className='mx-auto w-full rounded-xl border border-solid border-slate-300 shadow-inner p-1 px-4'
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='button-container flex w-full'>
            <button className='bg-yellow-500 text-slate-900 active:bg-amber-600 font-bold uppercase 
                              text-sm px-12 py-2 h-full w-full mr-2 mt-2 rounded shadow 
                              hover:shadow-lg outline-none 
                              focus:outline-none 
                              ease-linear transition-all duration-150' type='submit'>Create Account</button>
          </div>
        </form>
      );
    }
  }

export default RegistrationForm;