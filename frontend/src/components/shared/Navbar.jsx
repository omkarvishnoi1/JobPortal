import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-gradient-to-r from-purple-600 to-indigo-600'>
            <div className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto'>
                <div>
                    <h1 className='text-3xl font-extrabold text-white'>
                        Oppor<span className='text-[#F4C542]'>tune</span>
                    </h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex font-medium text-white items-center gap-6'>
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li className='hover:text-yellow-300'>
                                    <Link to="/admin/companies">Companies</Link>
                                </li>
                                <li className='hover:text-yellow-300'>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className='hover:text-yellow-300'>
                                    <Link to="/">Home</Link>
                                </li>
                                <li className='hover:text-yellow-300'>
                                    <Link to="/jobs">Jobs</Link>
                                </li>
                                <li className='hover:text-yellow-300'>
                                    <Link to="/browse">Browse</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/login">
                                    <Button variant="outline" className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                                        Signup
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage 
                                            src={user?.profile?.profilePhoto} 
                                            alt="User Profile" 
                                            className="border-2 border-white rounded-full shadow-lg" 
                                        />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 rounded-lg shadow-lg bg-white p-4">
                                    <div className='flex gap-4'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="User Profile" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium text-lg text-gray-800'>{user?.fullname}</h4>
                                            <p className='text-sm text-gray-500'>{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='my-4'>
                                        {user.role === 'student' && (
                                            <div className='flex items-center gap-2 cursor-pointer text-blue-600'>
                                                <User2 />
                                                <Button variant="link">
                                                    <Link to="/profile">View Profile</Link>
                                                </Button>
                                            </div>
                                        )}
                                        <div className='flex items-center gap-2 cursor-pointer text-red-600'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
