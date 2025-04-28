import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        options: ["Delhi NCR", "Bangalore", "Hydrabad", "Pune", "Mumbai", "Chennai", "Ahmedabad"]
    },
    {
        filterType: "Industry",
        options: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "Graphic Designer", "DevOps Engineer", "Mobile App Developer", "UI/UX Designer", "Product Manager", "Software Tester", "Cybersecurity Analyst"]
    },
    {
        filterType: "Salary",
        options: ["0-40k", "40k-1lakh", "1lakh to 5lakh", "5lakh to 10lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        if (selectedValue) {
            dispatch(setSearchedQuery(selectedValue));
        }
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-5 rounded-md shadow-md'>
            <h1 className='font-bold text-lg text-gray-900'>Filter Jobs</h1>
            <hr className='my-3' />
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className="mb-4">
                        <h2 className='font-semibold text-md text-gray-800'>{data.filterType}</h2>
                        <div className='space-y-3 mt-2'>
                            {data.options.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div key={itemId} className='flex items-center'>
                                        <RadioGroupItem value={item} id={itemId} className="h-4 w-4 text-[#6A38C2] border-gray-300" />
                                        <Label htmlFor={itemId} className="ml-2 text-sm text-gray-700">{item}</Label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default FilterCard;
