import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/tailwind.css';

class HomePage extends Component {
  render() {
    const Montserrat = {
      fontFamily: 'Montserrat, sans-serif',
      marginTop: '',
      marginBottom: '1rem',

      fontWeight: 'bold',
    };

    return (
        <div className="bg-slate-800 min-h-screen flex flex-col items-center">
            <div className="inline-flex mt-20 mb-0 w-full items-center" style={{ maxWidth: '1100px' }}>

          <img
                src='/LogoEnhancedSmall.png'
                alt='Business Crafter Logo'
                className='h-24 self-center absolute left-1/2 transform -translate-x-1/2 '
          />
                <Link to='/Login' className='ml-auto drop-shadow-2xl '>
                    <button className='bg-yellow-500 text-blue-900 text-lg pl-3 pr-3 mr-10  drop-shadow-2xl rounded' style={Montserrat}>
                        Login
                    </button>
                </Link>
            </div>
        <div className="custom-container m-10 p-5 inset-6 overflow-y-auto">
          <div className="bg-slate-200 m-3 p-12 rounded shadow-md mx-auto" style={{ maxWidth: '1100px' }}>
          <h1 className="text-3xl" style={Montserrat}>Welcome to Business Crafter</h1>
          <p className="text-sm text-gray-600 mb-6 ml-8" style={Montserrat}>
              Your All-in-One Business Building Solution.

              Sign up today and unlock the full potential of your business with Business Crafter, the ultimate platform designed to streamline every aspect of your operations.
            </p>
            
            <h1 className="text-lg" style={Montserrat}>
              Seamless Inventory Management
            </h1>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Take control of your inventory effortlessly with Business Crafter's Inventory Management System (IMS). Add, edit, and organize products with ease, allowing you to stay on top of stock levels and optimize your supply chain.
            </p>
            <h1 className="text-lg" style={Montserrat}>
              Tailor Your Register Layouts
            </h1>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Transform your point-of-sale experience with Business Crafter's Register Layout Designer. Convert your recipes and products into customizable buttons, creating a tailored register layout that aligns perfectly with your business needs. Maximize efficiency and enhance the customer experience.
            </p>
            <h1 className="text-lg" style={Montserrat}>
              Streamlined Transaction Management
            </h1>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
                Once your register layout is set, your team can access a streamlined interface that consolidates all register utilities. From ringing up sales to completing transactions, Business Crafter provides a user-friendly experience that simplifies the checkout process.
            </p>
            <h1 className="text-lg" style={Montserrat}>
              Why Business Crafter?
            </h1>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Efficiency Redefined: Streamline your business processes from employee management to inventory control and transaction completion.
            </p>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Tailored Solutions: Adapt our platform to your unique requirements, creating a system that perfectly fits your business model.
            </p>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Real-time Insights: Stay informed with real-time data on inventory levels, employee performance, and transaction history.
            </p>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Join the Business Crafter Community
            </p>
            <p className="text-sm text-gray-600 mb-6 ml-6" style={Montserrat}>
              Experience the future of business management. Join Business Crafter today and empower your business with the tools it deserves.
            </p>
            {/* Your other components go here */}
            <Link to="/register">
                <button style={Montserrat} className="bg-blue-950 hover:bg-blue-300 text-white font-bold absolute left-1/2 transform -translate-x-1/2 py-2 px-4 rounded">
                Get Started Now
                </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
