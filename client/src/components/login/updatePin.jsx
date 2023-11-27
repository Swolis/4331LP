import React, {Component, useState} from "react";
import '../../styles/tailwind.css';
import UpdatePinFunction from "../../handlers/updatePinHandler";


const UpdatePin = () => {
    const [state, setState] = useState ({
        name: '',
        newPin: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          newPinData = {
            name: state.name,
            pin: state.newPin,
            permission: true,
            defaultPin: true,
          }
          response = await UpdatePinFunction(newPinData);
          return response;
        }catch (error) {
          console.error('Pin update failed:', error);
      }

    }


    return ( 
    <form className='mx-auto gap-6 w-full object-contain p-10 flex flex-col items-center' onSubmit={handleSubmit}>
        <div className='form-group  w-5/6'>
        <label></label>
        <input
          className='mx-auto w-full rounded-full shadow-inner border-opacity-.5 p-1 px-4'
          type='text'
          name='employee name'
          placeholder='employee name'
          value={state.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='form-group w-5/6'>
        <label></label>
        <input
          className='mx-auto w-full rounded-full shadow-inner p-1 px-4'
          type='password'
          name='pin'
          placeholder='Password'
          value={state.newPin}
          onChange={handleInputChange}
        />
      </div>
    </form>
    );
}

export default UpdatePin;