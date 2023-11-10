import React, { useEffect, useState } from 'react'
import axios from 'axios';

import SearchBar from './SearchBar';
import { useLocation } from 'react-router-dom';
function CurrentLocation() {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);

    const [currentWeatherData, setCurrentWeatherData] = useState({});
    const handleBodyClick = (syntheticEvent) => {
        console.log('body click');
    }
    const location = useLocation();
    console.log(location)
    const fetchData = async () => {
        try {
            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
                console.log(position.coords.latitude, position.coords.longitude)


                // weather Data
            });
            const result = await axios.get(`https://api.weatherapi.com/v1/forecast.json?q=${lat},${long}&days=14&key=${import.meta.env.VITE_API_KEY}`);
            console.log(result.data);
            setCurrentWeatherData(result.data);

        }
        catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {

        fetchData();
    }, [lat, long])


    return (
        <main className='bg-inherit w-full h-screen inset-0'>

            <div style={{
                backgroundImage: `url()`,

                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100vh',
            }}
                className='object-cover bg-black '>
                <SearchBar />
                <div onClick={handleBodyClick} className={`mx-10 mt-2 py-3  sm:mx-5 sm:py-2 md:mx-5  lg:mx-7 sm:gap-0  flex flex-col gap-5  bg-gradient-to-tr from-inherit to-transperent shadow-2xl shadow-black rounded-2xl`}>
                    <div className='flex flex-col  text-white '>
                        <div className='px-16 lg:px-7 flex flex-row items-center  justify-around  sm:flex-col sm:justify-center md:flex-col  '>
                            <div className=' flex flex-row  sm:gap-4  gap-20 lg:gap-16 md:gap-7'>
                                <div className='flex flex-col items-center justify-center lg:pt-5 '>
                                    {currentWeatherData.location && <h1 className='text-4xl lg:text-2xl md:text-xl sm:text-lg'>{currentWeatherData.location.name}</h1>}

                                    {currentWeatherData.location && <span className='py-2 sm:py-0 lg:text-xs text-sm  md:text-xs sm:text-xs '>{new Date(currentWeatherData.location.localtime).toLocaleDateString("en-us",
                                        {
                                            month: "long",
                                            day: "2-digit",
                                            year: "numeric"
                                        })}</span>}

                                    {currentWeatherData.location && <span className=' text-sm lg:text-xs md:text-xs sm:text-xs '>{new Date(currentWeatherData.location.localtime).toLocaleTimeString('en-Us',
                                        {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</span>}

                                    <div className='flex flex-col  items-center justify-center'>
                                        {currentWeatherData.current && <span className=' pb-1 px-4  '><img className='w-[80px] h-auto lg:w-[60px] sm:w-[40px] md:w-[50px] ' src={currentWeatherData.current.condition.icon} /></span>}
                                        {currentWeatherData.current && <span className='text-base pt-2 sm:pt-0 md:pt-0 sm:text-xs md:text-sm '>{currentWeatherData.current.condition.text}</span>}

                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 py-10 sm:gap-1 sm:pt-7  lg:pt-20 items-start justify-start  sm:items-center sm:py-0 md:items-center md:py-12'>
                                    {currentWeatherData.current && <span className=' text-5xl sm:text-xl md:text-3xl lg:text-3xl ' >{Math.round(currentWeatherData.current.temp_c)}&#8451;</span>}
                                    {currentWeatherData.current && <span className='text-lg sm:text-xs md:text-sm lg:text-sm'>  Feels like {Math.round(currentWeatherData.current.feelslike_c)}&#8451;</span>}
                                </div>

                            </div>
                            {/* 3 Days Forecast  */}

                            <div className='py-3  px-5 lg:px-2 flex flex-col items-center justify-center gap-3  text-white sm:pt-5    md:pt-3  rounded-xl '>

                                <h2 className=' text-lg font-semibold sm:text-sm md:text-base sm:pb-2 md:pb-4'>3 Day Forecast</h2>
                                <div className='flex flex-row gap-6 md:gap-4 '>
                                    {currentWeatherData.forecast && currentWeatherData.forecast.forecastday.map((dayData, id) => {
                                        return (
                                            <div key={id} className='flex flex-col items-center gap-3 text-lg sm:text-xs ' >
                                                <div className='w-[130px] sm:w-[75px] md:w-[95px] lg:w-[100px] flex flex-col items-center bg-white bg-opacity-20 py-2 px-1 rounded-lg'>
                                                    <div className=' basis-full'>
                                                        <img className='w-[50px] h-[50px] sm:w-[30px] sm:h-[30px] object-center object-cover' src={dayData.day.condition.icon} alt='image' />
                                                    </div>
                                                    <p className=' basis-full text-base sm:text-xs md:text-md'>{new Date(dayData.date).toLocaleDateString('en-us',
                                                        {
                                                            weekday: 'long',
                                                        })}</p>

                                                    <div className='flex flex-col text-base sm:text-xs md:text-sm'>
                                                        <p>H : {Math.round(dayData.day.maxtemp_c)}&#8451;</p>
                                                        <p>L : {Math.round(dayData.day.mintemp_c)}&#8451;</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}


                                </div>
                            </div>



                        </div>
                    </div>
                    {/* Hourly forecast */}
                    <div className=' py-4 mx-5   flex flex-col items-center gap-3 justify-center md:py-2 sm:py-2 text-white    rounded-xl '>

                        <h2 className=' text-lg sm:text-sm md:text-base font-semibold sm:pb-2 md:pb-4 lg:pb-7'>Hourly Forecast</h2>

                        <div className=' flex flex-row flex-wrap items-center justify-center gap-6   md:gap-1 sm:gap-2'>{currentWeatherData.forecast && currentWeatherData.forecast
                            .forecastday[0].hour.map((mappedData, id) => {

                                return (
                                    <div key={id} >
                                        <div className='w-[80px] sm:w-[40px] md:w-[50px] py-2 sm:py-1  sm:gap-1 flex flex-col gap-2 items-center rounded-lg bg-white bg-opacity-20'>
                                            <img className='h-auto w-[35px] sm:w-[17px] md:w-[22px] object-cover' src={mappedData.condition.icon} alt='image' />

                                            <p className='text-sm sm:text-xs md:text-xs' >{Math.round(mappedData.temp_c)}&#8451;</p>
                                            <p className='whitespace-nowrap text-sm  sm:text-xs md:text-xs'>
                                                {new Date(mappedData.time).toLocaleTimeString('en-Us',
                                                    {
                                                        hour: '2-digit',


                                                    })}</p>

                                        </div>
                                    </div>
                                )
                            })}</div>


                    </div>
                </div>

            </div>


        </main>
    )
}

export default CurrentLocation