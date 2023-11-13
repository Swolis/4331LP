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
        <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={this.handleSubmit}>
            <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'></link>
          <div className='form-group w-5/6'>
            <label></label>
            <input
              className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
              type='text'
              name='businessName'
              placeholder='Business Name'
              value={this.state.businessName}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-5/6'>
            <label></label>
            <input
              className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
              type='text'
              name='businessEmail'
              placeholder='Business Email'
              value={this.state.businessEmail}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-5/6'>
            <label></label>
            <input
              className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
              type='text'
              name='businessPhone'
              placeholder='Business Phone Number'
              value={this.state.businessPhone}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-5/6'>
            <label></label>
            <input
              className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
              type='text'
              name='address'
              placeholder='Address'
              value={this.state.address}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group  w-5/6'>
            <label></label>
            <input
              className='mx-auto w-full rounded-full shadow-inner border-opacity-.5 p-1 px-4'
              type='text'
              name='username'
              placeholder='Username'
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='form-group w-5/6'>
            <label></label>
            <input
              className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
              type='password'
              name='password'
              placeholder='Password'
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </div>
          <div className='button-container flex'>
            <button className='bg-red-500 rounded-full p-1 px-4 text-gray-200 font-serif m-2' type='submit'>Register</button>
          </div>
        </form>
      );
    }
  }

export default RegistrationForm;