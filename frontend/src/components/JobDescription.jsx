import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real-time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-6'>
            {/* Job Title & Application Button */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
                <div className='md:w-2/3'>
                    <h1 className='font-semibold text-3xl text-gray-900'>{singleJob?.title}</h1>
                    <div className="flex flex-wrap gap-3 mt-4">
                            <Badge
                              className="text-white bg-blue-600 font-bold py-1 px-3 rounded-lg"
                              variant="ghost"
                            >
                              {singleJob?.position} Positions
                            </Badge>
                            <Badge
                              className="text-white bg-[#F83002] font-bold py-1 px-3 rounded-lg"
                              variant="ghost"
                            >
                              {singleJob?.jobType}
                            </Badge>
                            <Badge
                              className="text-white bg-[#7209b7] font-bold py-1 px-3 rounded-lg"
                              variant="ghost"
                            >
                              {singleJob?.salary} LPA
                            </Badge>
                          </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`mt-4 md:mt-0 rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Description Section */}
            <div className='mt-8'>
                <h2 className='text-2xl font-semibold text-gray-900 border-b-2 border-gray-300 pb-2'>Job Description</h2>
                <div className='my-4 space-y-4'>
                    <h3 className='font-bold text-lg text-gray-800'>Role:</h3>
                    <p className='text-gray-600'>{singleJob?.title}</p>

                    <h3 className='font-bold text-lg text-gray-800'>Location:</h3>
                    <p className='text-gray-600'>{singleJob?.location}</p>

                    <h3 className='font-bold text-lg text-gray-800'>Description:</h3>
                    <p className='text-gray-600'>{singleJob?.description}</p>

                    <h3 className='font-bold text-lg text-gray-800'>Experience:</h3>
                    <p className='text-gray-600'>{singleJob?.experience} yrs</p>

                    <h3 className='font-bold text-lg text-gray-800'>Salary:</h3>
                    <p className='text-gray-600'>{singleJob?.salary} LPA</p>

                    <h3 className='font-bold text-lg text-gray-800'>Total Applicants:</h3>
                    <p className='text-gray-600'>{singleJob?.applications?.length}</p>

                    <h3 className='font-bold text-lg text-gray-800'>Posted Date:</h3>
                    <p className='text-gray-600'>{singleJob?.createdAt.split("T")[0]}</p>
                </div>
            </div>
        </div>
    )
}

export default JobDescription;
