import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='bg-gradient-to-r from-teal-500 to-blue-600 text-center py-16'>
    <div className='flex flex-col gap-6 items-center'>
        <span className='px-6 py-3 rounded-full bg-white text-[#F83002] font-semibold text-lg'>
            Leading Platform for Career Growth
        </span>
        <h1 className='text-5xl font-extrabold text-white'>
            Find, Apply, and Land Your <br /> <span className='text-[#F4C542]'>Ideal Job</span>
        </h1>
        <p className='text-lg text-white opacity-90 max-w-2xl mx-auto'>
            Unlock endless career opportunities and connect with top employers. Find your perfect job, advance your career, and start a new chapter today!
        </p>
        <div className='relative w-[60%] max-w-4xl mx-auto'>
    <div className="flex w-full items-center">
        <input
            type="text"
            placeholder='Search for jobs...'
            onChange={(e) => setQuery(e.target.value)}
            className='outline-none border-none w-full py-3 px-6 text-lg rounded-full shadow-md focus:ring-2 focus:ring-[#6A38C2] placeholder-gray-500'
        />
        <Button 
            onClick={searchJobHandler} 
            className="rounded-full bg-[#6A38C2] text-white hover:bg-[#5b30a6] transition-all duration-300 ease-in-out py-3 px-6 ml-4"
        >
            <Search className='h-5 w-5' />
        </Button>
    </div>
</div>

    </div>
</div>

    )
}

export default HeroSection