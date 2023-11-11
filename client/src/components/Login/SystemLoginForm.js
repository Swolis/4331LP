// client

import React, { Component } from 'react';
import '../../styles/SystemLoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <form className='mx-auto gap-10 w-full object-contain p-10 flex flex-col items-center' onSubmit={this.handleSubmit}>
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
            placeholder='password'
            value={this.state.password}
            onChange={this.handleInputChange}
          />
        </div>
        <button className='self-center bg-green-900 rounded-full p-2 px-4 text-gray-200'  type='submit'>login</button>
      </form>
    );
  }
}

export default LoginForm;
