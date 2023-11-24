import React, { Component } from 'react';
//import handleRegistration from '../../handlers/RegistrationHandler';
import '../../styles/tailwind.css';
import handleLogin from '../../handlers/LoginHandler';

class employeeLoginFrom extends Component {
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
        handleLogin(this.state);
      };

  
    render() {
      return (
        <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={this.handleSubmit}>
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
            <button style={{background: '#ffd485'}}className=' rounded-full p-1 px-4 text-black-600 m-2' type='submit'>Login</button>
          </div>
        </form>
      );
    }
  }

export default employeeLoginFrom;