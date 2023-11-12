import React, { Component } from 'react';
import '../../styles/SystemRegisterForm.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BuisnessName: '',
      BuisnessEmail: '',
      BuisnessPhone: '',
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
    // Implement your logic for handling form submission here
    // You can access the form values in this.state.username and this.state.password
  }

  render() {
    return (
      <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={this.handleSubmit}>
        <div className='form-group w-5/6'>
          <label></label>
          <input
            className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
            type='text'
            name='BusinessName'
            placeholder='Business Name'
            value={this.state.BuisnessName}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form-group w-5/6'>
          <label></label>
          <input
            className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
            type='text'
            name='BusinessEmail'
            placeholder='Business Email'
            value={this.state.BuisnessEmail}
            onChange={this.handleInputChange}
          />
        </div>
        <div className='form-group w-5/6'>
          <label></label>
          <input
            className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
            type='text'
            name='BusinessPhone'
            placeholder='Business Phone Number'
            value={this.state.BuisnessPhone}
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
            value={this.state.BuisnessName}
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

export default RegisterForm;
