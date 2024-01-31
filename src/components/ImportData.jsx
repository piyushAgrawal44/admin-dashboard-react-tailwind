import React, { useState } from 'react';
import Navbar from './Navbar';
import PageLoader from './loaders/PageLoader';

export default function ImportData() {

  const [newData, setNewData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewDataChange = (e) => {
    setNewData(e.target.value);
  };



  const handleAddData = async () => {

    try {
      setLoading(true);

      const response = await fetch('http://localhost:8000/new/article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: JSON.parse(newData),
        }),
      });

      if (response.ok) {
        alert('Successfully added!');
        setNewData('');
      } else {
        alert('Sorry, some technical issue.');
      }
    } catch (error) {
      console.error(error);
      alert('Sorry, some technical issue.');
    } finally {
      setLoading(false);
    }
  };




  return (
    <>
      {
        loading && <PageLoader />
      }
      <div className="bg-[#f2f3ff] md:flex max-w-full">
        <Navbar active="import_data" />
        <div className='md:w-[80%] md:ml-[20%] px-5 sm:px-10 mt-3 min-h-screen '>

          <p className=''>Sample Data: </p>
          <div className='bg-gray-700 p-3 rounded-sm text-gray-400 mb-3'>
          {
              `
              {
                "end_year": 2025,
                "intensity": 9,
                "sector": "Energy",
                "topic": "battery",
                "insight": "Insight",
                "url": "",
                "region": "",
                "start_year": "",
                "impact": "",
                "added": "January, 16 2017 05:54:47",
                "published": "January, 10 2017 00:00:00",
                "country": "",
                "relevance": 3,
                "pestle": "Technological",
                "source": "Test",
                "title": "Title.",
                "likelihood": 3
            }
              `
            }
          </div>
          <div className="mb-3 ">

            <label htmlFor="newData" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter a valid json</label>
            <textarea id="newData"
              onChange={handleNewDataChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your json here..." value={newData}></textarea>
          </div>

          <button type='button' onClick={handleAddData} className='bg-blue-500 text-white text-lg  px-2 py-1  rounded-md'>Add</button>
        </div>

      </div>
    </>
  )
}
