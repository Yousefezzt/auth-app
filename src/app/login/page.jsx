"use client"
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {

   const router = useRouter()

    const [errMsg, setErrMsg] = useState(null)
    const [sucMsg, setSucMsg] = useState(null)

    let user = {
        email: "",
        password: "",
    }

    async function registerNewUser(values) {
        setErrMsg(null)

        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth//signin", values)
            setSucMsg(data.message)

            setTimeout(() => {
                router.push("/")
            }, 1000)


        } catch (error) {
            console.log("error", error.response.data.message);
            setErrMsg(error.response.data.message)
        }
    }

    const formikObj = useFormik({

        initialValues: user,

        onSubmit: registerNewUser,

        validate: function (values) {

            setErrMsg(null)

            const errors = {};


            if (values.email.includes("@") === false || values.email.includes(".") === false) {
                errors.email = "Email should be valid"
            }

            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "Password should be between 4 and 12 characters"
            }



            return errors;
        }

    })



    return (
        <div className='w-[75%] m-auto py-5'>

            {errMsg ? <div className='alert alert-error'>{errMsg}</div> : ""}
            {sucMsg ? <div className='alert alert-success'>{sucMsg}</div> : ""}

            <h1>Login:</h1>

            <form onSubmit={formikObj.handleSubmit} className='py-5' >

                <label htmlFor="email">Email:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.email} onChange={formikObj.handleChange} id='email' type="text" placeholder='Email' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.email && formikObj.touched.email && <div className='alert alert-error my-2'>{formikObj.errors.email}</div>}

                <label htmlFor="password">Password:</label>
                <input onBlur={formikObj.handleBlur} value={formikObj.values.password} onChange={formikObj.handleChange} id='password' type="pessword" placeholder='Password' className='input input-bordered w-full mb-3 ' />
                {formikObj.errors.password && formikObj.touched.password && <div className='alert alert-error my-2'>{formikObj.errors.password}</div>}

                    <button disabled={formikObj.isValid === false || formikObj.dirty === false} type='submit' className='btn btn-success text-white'>Register</button>

            </form>
        </div>
    )
}
