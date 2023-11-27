import React, { useState, useRef, useEffect } from 'react';
import createPromise  from './createPromise';

const useInputModal = (heading, dataMethod) => {

    const [textInput, setInput] = useState('');
    const [resolver, setResolver] = useState({resolver: null});
    const [open, setOpen] = useState(false);


    const handleInputChange = (e) => {
        setInput(e.target.value);
    }

    const getUserInput = async () => {
        setOpen(true);
        const [ promise, resolve ] = await createPromise()
        setResolver({ resolve })
        return promise;
    }

    const onClick = async (status) => {
        console.log(textInput);
        dataMethod(textInput);
        setOpen(false);
        resolver.resolve(status);
        setInput('');
    }

    const InputModal = () => {
        const inputRef = useRef(null);

        useEffect(() => {
            if (open) {
                inputRef.current.focus();
            }
        }, [open]);

        return (
            <>
            {open ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                {heading}
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => onClick(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                x
                                </span>
                            </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <input key='label' className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                                    focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                                                    invalid:border-pink-500 invalid:text-pink-600
                                                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                                        "type="text" id="name" name="name" defaultValue={textInput} onChange={handleInputChange} ref={inputRef}/>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => onClick(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-yellow-500 text-white active:bg-amber-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => onClick(true)}
                            >
                                Save Changes
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
        )
    }

    return [getUserInput, InputModal]
}

export default useInputModal;