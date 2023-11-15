// This is the main container for the components of the user dashboard
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/tailwind.css';

class DashboardTemplate extends Component {
    render() {
        return (

            <div className="bg-slate-800 min-h-screen flex flex-col items-center">
                <p>
                    User DashboardTemplate
                </p>
            </div>      
            
            )
    }
}

export default DashboardTemplate;