import { useContext, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';

const useIdleTimeout = ({onIdle, idleTime = 1}) => {
    const idleTimeout = 1000 * idleTime;
    const [isIdle, setIdle] = useState(false);
    const handleIdle = () => {
        setIdle(true)
        window.location.href=('/Login');
    }


    const idleTimer = useIdleTimer({
        timeout: idleTimeout,
        promptBeforeTimeout: idleTimeout / 2,
        onPrompt: onIdle,
        onIdle: handleIdle,
        debounce: 500

    })

    return {
        isIdle,
        setIdle,
        idleTimer
    }
}

export default useIdleTimeout;