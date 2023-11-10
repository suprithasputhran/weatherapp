import React, { useState, useEffect } from 'react'
import axios from 'axios'
import partlyCloudy from '../assets/rainning.avif';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const debouncedSearchQuery = useDebounce(searchQuery, 1000);


    const apiKey = import.meta.env.VITE_API_KEY;

    const navigate = useNavigate();
    const previewCity = (weatherdata) => {
        const city = weatherdata.name;
        const lat = weatherdata.lat;
        const lon = weatherdata.lon;
        navigate('/citycard', {
            replace: false,
            state: {
                city,
                lat,
                lon
            }

        });



    }
    useEffect(() => {

        getWeather(searchQuery);


    }, [debouncedSearchQuery])
    const getWeather = async (searchQuery) => {


        try {
            await axios.get(`https://api.weatherapi.com/v1/search.json?q=${searchQuery}&key=${apiKey}`)
                .then(result => {
                    console.log(result.data);
                    setWeatherData(result.data);
                })


        }
        catch (error) {
            console.log(error);
            setSearchError(true);
            // if (error.response) {
            //     console.log('Server responded with status code:', error.response.status);
            //     console.log('Response data:', error.response.data);
            // } else if (error.request) {
            //     console.log('No response received:', error.request);
            // } else {
            //     console.log('Error creating request:', error.message);
            // }
        }


    }


    const handleInputChange = (event) => {
        let searchQuery = event.target.value;
        console.log(event.target.value);
        setSearchQuery(searchQuery);
        getWeather(searchQuery);
    }

    const handleClick = () => { setSearchQuery('') }

    return (
        <div className=' pt-7 mx-0 flex flex-col items-center justify-center '  >
            <div >

                <div className='flex bg-white w-[900px] sm:w-[300px] md:w-[375px] lg:w-[700px] items-center justify-between  rounded-xl shadow-2xl shadow-black' >
                    <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search for city or state"
                        className="  px-6 py-3 w-[850px] sm:px-4 sm:py-2  sm:w-[275px] md:w-[350px] lg:w-[700px] rounded-xl sm:text-sm md:text-base lg:text-normal text-lg focus:outline-none placeholder:text-black" />
                    {searchQuery ? <button type="submit" className='  w-[50px] sm:w-[25px] rounded-r-xl cursor-pointer' onClick={handleClick} > <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                    </svg> </button> : <button className='w-[50px] sm:w-[25px]  rounded-r-xl '><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg></button>
                    }
                </div>
                {
                    searchQuery ? <div > {weatherData && <ul className='absolute w-[900px] sm:w-[300px] md:w-[375px] lg:w-[700px] px-5  mt-2  text-black text-lg lg:text-normal sm:text-sm md:text-base bg-white rounded-xl  placeholder:text-black'>
                        {
                            weatherData.map((weatherdata, index) => {
                                return (
                                    <div key={index} className=' z-50'>
                                        <li className="py-3 sm:py-2 cursor-pointer list-none  " >
                                            <p className="cursor-pointer" onClick={() => previewCity(weatherdata)} >{weatherdata.name},&nbsp;{weatherdata.region},&nbsp;{weatherdata.country} </p>
                                        </li>

                                    </div>
                                )
                            })}
                    </ul>}</div> : <div>
                    </div>
                }

            </div>

        </div >
    )
}

export default SearchBar