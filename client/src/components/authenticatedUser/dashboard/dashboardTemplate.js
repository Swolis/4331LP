import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIdle , handleIdleTimeout} from '../../../services/IdleContext';

import '../../../styles/tailwind.css';

/*
    This is the mockup page for testing. 
*/

const DashboardTemplate = () => {
    const { isIdle, startIdle } = useIdle();

    useEffect(() => {
        startIdle();
    }, [startIdle]);

    useEffect(() => {
        if(isIdle) {
            handleIdleTimeout();
        }
    })

    return (
        <div className="bg-slate-800 min-h-screen flex flex-col items-center">
            <p className='text-white'>
                User DashboardTemplate
            </p>

            <div className='flex flex-row justify-center items-center h-screen overflow-auto'>
                <Link to={'/ProductPage'}>
                    <button style={{background: '#ffd485'}}className=' rounded p-1 px-4 text-gray-600 m-2' type='submit'>Your inventory</button>
                </Link>
                <Link to={'/RecipePage'}>
                <button style={{background: '#ffd485'}}className=' rounded p-1 px-4 text-gray-600 m-2' type='submit'>Your Recipes</button>
                </Link>
            </div>


            
            {isIdle && (
                <div>
                    <p>User is idle. Redirecting to login...</p>
                </div>
            )}
        </div>
    );
};

export default DashboardTemplate;
