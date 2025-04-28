import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-full sm:w-1/2 md:w-1/3 border border-gray-200 rounded-md p-6 my-10 bg-white shadow-lg">
                    <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>

                    <div className="my-4">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Full Name"
                            required
                        />
                    </div>

                    <div className="my-4">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="my-4">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className="my-4">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="my-4">
                        <Label>Role</Label>
                        <RadioGroup className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="my-4 flex items-center gap-2">
                        <Label>Profile Picture</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                        {input.file && (
                            <div className="mt-2">
                                <img src={URL.createObjectURL(input.file)} alt="Profile Preview" className="h-20 w-20 object-cover rounded-full" />
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 bg-blue-600 text-white" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-blue-600 text-white hover:bg-blue-700">
                            Signup
                        </Button>
                    )}

                    <div className="text-center">
                        <span className="text-sm text-gray-600">Already have an account? </span>
                        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
