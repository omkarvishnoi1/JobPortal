import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-6 rounded-lg shadow-lg bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
            {/* Job Date and Save Button */}
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full p-2 hover:bg-gray-100">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className='flex items-center gap-3 mt-4'>
                <Button className="p-3" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-xl'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className='my-4'>
                <h1 className='font-bold text-xl text-gray-900'>{job?.title}</h1>
                <p className='text-sm text-gray-600 mt-2'>{job?.description}</p>
            </div>

            {/* Job Badges */}
            <div className="flex flex-wrap gap-3 mt-4">
                                        <Badge
                                          className="text-white bg-blue-600 font-bold py-1 px-3 rounded-lg"
                                          variant="ghost"
                                        >
                                          {job?.position} Positions
                                        </Badge>
                                        <Badge
                                          className="text-white bg-[#F83002] font-bold py-1 px-3 rounded-lg"
                                          variant="ghost"
                                        >
                                          {job?.jobType}
                                        </Badge>
                                        <Badge
                                          className="text-white bg-[#7209b7] font-bold py-1 px-3 rounded-lg"
                                          variant="ghost"
                                        >
                                          {job?.salary} LPA
                                        </Badge>
                                      </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-4 mt-6'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className='py-2 px-4'>Details</Button>
                <Button className="bg-[#7209b7] text-white hover:bg-[#5f32ad] py-2 px-4 rounded-lg">Save for later</Button>
            </div>
        </div>
    )
}

export default Job;
