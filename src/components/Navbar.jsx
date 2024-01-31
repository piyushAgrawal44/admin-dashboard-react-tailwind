import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(props) {

    const mobileDiv = useRef(null);

    const showNavbar = () => {
        mobileDiv.current.classList.toggle('hidden');
    }

    return (
        <>
            <nav className="bg-[#1c2434] sticky top-0 w-full z-10 dark:bg-gray-900 block md:hidden">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-medium whitespace-nowrap text-white">📃 Dashboard</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" onClick={showNavbar} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 hover:text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>

                    <div className="hidden w-full md:block md:w-auto" ref={mobileDiv} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">


                            <li className="mb-2">

                                <Link to="/" replace className={`flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 ${props.active === "dashboard" ? 'bg-gray-600' : ''}`} aria-current="page"><span className="select-none">Dashboard</span></Link>
                            </li>
                            <li>
                                <Link to="/import/data" replace className={`flex items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 ${props.active === "import_data" ? 'bg-gray-600' : ''}`} aria-current="page"><span className="select-none">Import Data</span></Link>
                            </li>



                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="bg-[#1c2434] fixed h-screen z-10 hidden md:block md:w-[20%]">
                <div className="max-w-screen-2xl  p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center md:text-2xl lg:text-3xl font-medium whitespace-nowrap text-white">📃 MYDash</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" onClick={showNavbar} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="mt-5" id="navbar-default">


                        <br />
                        <ul className="mb-8 text-sm font-medium">
                            <li className='mb-2'>

                                <Link to="/" replace className={`flex items-center lg:text-lg rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 ${props.active === "dashboard" ? 'bg-gray-600' : ''}`} aria-current="page"><span className="select-none">Dashboard</span></Link>
                            </li>
                            <li className='mb-2'>
                                <Link to="/import/data" replace className={`flex items-center lg:text-lg rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-gray-600 ${props.active === "import_data" ? 'bg-gray-600' : ''}`} aria-current="page"><span className="select-none">Import Data</span></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



        </>
    )
}


Navbar.defaultProps = {
    active: ""
}