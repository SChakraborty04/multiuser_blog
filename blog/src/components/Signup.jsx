import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Signup() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const [err,setErr]=useState("")
    const signup=async (data)=>{
        setErr("")
        try {
            const session=await authService.createAccount(data)
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                window.location.reload();
                navigate('/')
            }
        } catch (error) {
            setErr(error.message)
        }
    }
    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up for a new account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Login
                        </Link>
            </p>
            {err && <p className="text-red-600 mt-8 text-center">{err}</p>}
            <form onSubmit={handleSubmit(signup)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Name: "
                    placeholder="Enter your name"
                    type="text"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            email: (value) => {
                                return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                            }
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true,
                        minLength: 6
                    })}
                    />
                    <Button
                    type="submit"
                    className="w-full"
                    >
                        Sign Up
                    </Button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Signup
