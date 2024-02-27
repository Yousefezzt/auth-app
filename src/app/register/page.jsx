"use client"
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
export default function Register() {

   const router = useRouter()

    const [errMsg, setErrMsg] = useState(null)
    const [sucMsg, setSucMsg] = useState(null)

    let user = {
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: ""
    }

    async function registerNewUser(values) {
        setErrMsg(null)

        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
            setSucMsg(data.message)

            setTimeout(() => {
                router.push("/login")
            }, 1000)


        } catch (error) {
            setErrMsg(error.response.data.message)
        }
    }

    const formikObj = useFormik({

        initialValues: user,

        onSubmit: registerNewUser,

        validate: function (values) {

            setErrMsg(null)

            const errors = {};

            if (values.name.length < 4 || values.name.length > 12) {
                errors.name = "Name should be between 4 and 12 characters"
            }

            if (values.email.includes("@") === false || values.email.includes(".") === false) {
                errors.email = "Email should be valid"
            }

            if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
                errors.phone = "Phone in valid"
            }

            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "Password should be between 4 and 12 characters"
            }

            if (values.rePassword !== values.password) {
                errors.rePassword = "Re Password should be same as Password"
            }

            return errors;
        }

    })



    return (
        <div className='w-[75%] m-auto py-5'>

            {errMsg ? <div className='alert alert-error'>{errMsg}</div> : ""}
            {sucMsg ? <div className='alert alert-success'>{sucMsg}</div> : ""}

            <h1>Register Now:</h1>

            <form onSubmit={formikObj.handleSubmit} className='py-5' >

                <label htmlFor="name">Name:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.name} onChange={formikObj.handleChange} id='name' type="text" placeholder='Name' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.name && formikObj.touched.name && <div className='alert alert-error my-2'>{formikObj.errors.name}</div>}

                <label htmlFor="email">Email:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange} id='email' type="text" placeholder='Email' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.email && formikObj.touched.email && <div className='alert alert-error my-2'>{formikObj.errors.email}</div>}

                <label htmlFor="phone">Phone:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.phone} onChange={formikObj.handleChange} id='phone' type="text" placeholder='Phone' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.phone && formikObj.touched.phone && <div className='alert alert-error my-2'>{formikObj.errors.phone}</div>}

                <label htmlFor="password">Password:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange} id='password' type="password" placeholder='Password' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.password && formikObj.touched.password && <div className='alert alert-error my-2'>{formikObj.errors.password}</div>}

                <label htmlFor="rePassword">Re Password:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.rePassword} onChange={formikObj.handleChange} id='rePassword' type="password" placeholder='Re Password' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.rePassword && formikObj.touched.rePassword && <div className='alert alert-error my-2'>{formikObj.errors.rePassword}</div>}


                    <button disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-success text-white'>Register</button>

            </form>
        </div>
    )
}
