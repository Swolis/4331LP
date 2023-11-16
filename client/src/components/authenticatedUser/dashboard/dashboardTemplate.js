import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIdle , handleIdleTimeout} from '../../../services/IdleContext';

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

            <Link to={'/ProductPage'}>
            <button style={{background: '#ffd485'}}className=' rounded p-1 px-4 text-gray-600 m-2' type='submit'>add new product</button>
            </Link>
            
            {isIdle && (
                <div>
                    <p>User is idle. Redirecting to login...</p>
                </div>
            )}
        </div>
    );
};

export default DashboardTemplate;
