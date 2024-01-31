import React, { useEffect, useRef, useState } from 'react';
import Card from './Card.jsx';
import Table from './Table';
import Checklist from '../images/checklist.png';
import Target from '../images/target.png';
import Country from '../images/country.png';
import NewsReport from '../images/news-report.png';
import Navbar from './Navbar.jsx';
import PageLoader from './loaders/PageLoader.jsx';
import LineChart from './LineChart.jsx';
import BarChart from './BarChart.jsx';
import Pagination from './pagination/Pagination.jsx';

export default function Dashboard() {


    let backendAPI = process.env.REACT_APP_BACKEND_URL;

    const searchDiv = useRef(null);
    const [dropDownSearchInput, setDropDownSearchInput] = useState("");
    const [dropDownSearchOptions, setDropDownSearchOptions] = useState([]);



    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [query, setQuery] = useState("");
    const isFirstRender = useRef(true);
    const [totalArticles, setTotalArticles] = useState(0);
    const [selectedTopic, setSelectedTopic] = useState("")

    const [articlesData, setArticlesData] = useState({ articles: [], topics_count: [], countries_count: [], sources_count: [], impactValues: [], impactWiseArticles: [], intensityWiseArticles: [], intensityValues: [], publishedArticlesCount: [], publishedYears: [], addedArticlesCount: [], addedYears: [] });

    const [topics, setTopics] = useState([]);


    const changePage = (val) => {
        setPage(val);
    }

    const changePerPage = (val) => {

        setPage(1);
        setPerPage(val);

    }

    const prevPage = () => {

        let temp = page;
        let temp2 = page - 1 < 1 ? 1 : page - 1;
        if (temp2 !== temp) {
            setPage(temp2);
        }

    }

    const nextPage = () => {

        let temp = page;
        const totalPages = Math.ceil(totalArticles.length / perPage);
        let temp2 = page + 1 > totalPages ? totalPages : page + 1;

        if (temp2 !== temp) {

            setPage(temp2);
        }
    }


    useEffect(() => {

        fetchData();

        // eslint-disable-next-line
    }, [page, perPage]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (!isFirstRender.current) {
                if (dropDownSearchInput === "") {
                    setDropDownSearchOptions(topics);
                }
                else {
                    setDropDownSearchOptions(topics.filter((ele) => {
                        return ele.includes(dropDownSearchInput);
                    }));
                }
            }
            isFirstRender.current = false;
        }, 1000);
        return () => clearTimeout(timeOutId);
        // eslint-disable-next-line 
    }, [dropDownSearchInput])


    const handleKeyPress = (event) => {

        if (event.key === 'Enter') {
            setPage(1);
            setPerPage(10);
            fetchData();
        }
    };

    const fetchData = async () => {
        setLoading(true);

        await fetch(backendAPI + "/all/article?query=" + query + "&page=" + page + "&perPage=" + perPage + "&topic=" + selectedTopic).then(res => res.json()).then(data => {

            setTotalArticles(data.articles_count);
            setTopics(data.topics);
            setDropDownSearchOptions(data.topics);

            const impactValues = Object.keys(data.impacts).map(Number).sort((a, b) => a - b);
            const impactWiseArticles = impactValues.map(key => data.impacts[key]);

            const intensityValues = Object.keys(data.intensities).map(Number).sort((a, b) => a - b);
            const intensityWiseArticles = intensityValues.map(key => data.intensities[key]);

            const addedYears = Object.keys(data.addedYearArticles).sort();
            const addedArticlesCount = addedYears.map(key => data.addedYearArticles[key]);

            const publishedYears = Object.keys(data.publishedYearArticles).sort();
            const publishedArticlesCount = publishedYears.map(key => data.publishedYearArticles[key]);


            setArticlesData({
                ...articlesData,
                articles: data.articles,
                sources_count: data.sources_count,
                countries_count: data.countries_count,
                topics_count: data.topics_count,
                impactValues: impactValues, impactWiseArticles: impactWiseArticles,
                intensityValues: intensityValues, intensityWiseArticles: intensityWiseArticles,
                addedYears: addedYears, addedArticlesCount: addedArticlesCount,
                publishedYears: publishedYears, publishedArticlesCount: publishedArticlesCount
            });
            setLoading(false);

        }).catch((error) => {
            console.log(error)
            alert("Failed to fetch the data.");
        }

        );
    }



    return (

        <>
            {
                loading && <PageLoader />
            }
            {
                !loading && <div className='bg-[#f2f3ff] md:flex max-w-full'>
                    <Navbar active="dashboard" />
                    <div className='md:max-w-[80%] md:ml-[20%] px-4 sm:px-10'>


                        <div className=' my-5'>
                            <p>Filters:</p>
                            <div className='flex flex-wrap items-center  gap-2'>
                                <div className="relative mb-1">

                                    <input type="search" className="max-w-[300px] shrink block p-2 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:border-blue-500" placeholder="Search article title..." onChange={event => setQuery(event.target.value)} value={query} onKeyPress={handleKeyPress} />
                                </div>

                                <div className="relative group mb-1">
                                    <button id="dropdown-button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none" onClick={() => {
                                        searchDiv.current.classList.toggle('hidden');
                                    }}>
                                        <span className="mr-2">{selectedTopic !== "" ? selectedTopic : "Select Topic"}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <div className="hidden absolute mb-1 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 " ref={searchDiv}>

                                        <input id="search-input" className="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autoComplete="off" onChange={(e) => { setDropDownSearchInput(e.target.value) }} />

                                        <div className='max-h-[300px] overflow-auto'>
                                            <span onClick={() => {
                                                searchDiv.current.classList.toggle('hidden');
                                                setSelectedTopic("");
                                            }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">Select Topic</span>
                                            {
                                                dropDownSearchOptions.map((option, index) => {
                                                    return <span key={index} onClick={() => {
                                                        searchDiv.current.classList.toggle('hidden');
                                                        setSelectedTopic(option);
                                                    }} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{option}</span>
                                                })
                                            }
                                        </div>

                                    </div>
                                </div>
                                <button className=' bg-blue-500 text-white text-lg  px-2 py-1  rounded-md mb-1' onClick={() => {
                                    setPage(1);
                                    setPerPage(10);
                                    fetchData();
                                }}><i className="bi bi-search"></i></button>
                            </div>
                        </div>



                        {/* Card */}
                        <div className="flex flex-wrap gap-[8px] ">
                            <Card title={"Total Articles"} value={totalArticles} color={"321FDB"} imgName={NewsReport} />
                            <Card title={"Total Country"} value={articlesData.countries_count} color={"F9B115"} imgName={Country} />
                            <Card title={"Total Sources"} value={articlesData.sources_count} color={"3399FF"} imgName={Checklist} />
                            <Card title={"Total Topics"} value={articlesData.topics_count} color={"E55353"} imgName={Target} />
                        </div>

                        <div className="mt-3">
                            <div className="flex flex-wrap gap-2 my-5 ">

                                <div className='w-full max-w-full sm:w-[calc(50%-6px)] bg-white rounded-md shadow p-2 px-3 mb-5'>
                                    <h3 className='mb-4 font-bold'>Year wise added articles count</h3>
                                    <LineChart values={articlesData.addedArticlesCount} labels={articlesData.addedYears} />
                                </div>

                                <div className='w-full sm:w-[calc(50%-6px)] bg-white rounded-md shadow p-2 px-3 mb-5'>
                                    <h3 className='mb-4 font-bold'>Year wise published articles count</h3>
                                    <LineChart values={articlesData.publishedArticlesCount} labels={articlesData.publishedYears} />

                                </div>

                                <div className='w-full sm:w-[calc(50%-6px)] bg-white rounded-md shadow p-2 px-3 mb-5'>
                                    <h3 className='mb-4 font-bold'>Impact wise articles count</h3>
                                    <BarChart values={articlesData.impactWiseArticles} labels={articlesData.impactValues} />
                                </div>

                                <div className='w-full sm:w-[calc(50%-6px)] bg-white rounded-md shadow p-2 px-3 mb-5'>
                                    <h3 className='mb-4 font-bold'>Intensity wise articles count</h3>
                                    <BarChart values={articlesData.intensityWiseArticles} labels={articlesData.intensityValues} />
                                </div>
                            </div>


                        </div>

                        <div className="w-[100%] bg-white rounded-md shadow p-2 px-3">
                            <div className="grid sm:flex justify-between">
                                <h3 className='mb-4 font-bold'>List of Articles</h3>

                            </div>
                            <Table data={articlesData.articles} />


                        </div>

                        {
                            totalArticles > 0 && <div className='my-2'>
                                <Pagination dataCount={totalArticles} page={page} perPage={perPage} changePage={(val) => changePage(val)} changePerPage={(val) => changePerPage(val)} prevPage={prevPage} nextPage={nextPage} />
                            </div>
                        }
                        <br />


                        <div className="customLoaderBox" id="customLoaderBox">
                            <div className="dot-1"></div>
                            <div className="dot-2"></div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
