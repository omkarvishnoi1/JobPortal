import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-xl">
                {/* Profile Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-28 w-28">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
                            <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full" variant="outline">
                        <Pen />
                    </Button>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="text-gray-500" />
                        <span className="text-gray-700">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="text-gray-500" />
                        <span className="text-gray-700">{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-6">
                    <h1 className="font-semibold text-lg text-gray-800">Skills</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills.length > 0 ? (
                            user?.profile?.skills.map((item, index) => <Badge key={index} className="text-sm">{item}</Badge>)
                        ) : (
                            <span className="text-gray-500">NA</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-semibold text-gray-800">Resume</Label>
                    {
                        isResume ? (
                            <a target="blank" href={user?.profile?.resume} className="text-blue-500 hover:underline cursor-pointer">
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className="text-gray-500">NA</span>
                        )
                    }
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl my-10 p-8">
                <h1 className="font-semibold text-lg text-gray-800 mb-5">Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
