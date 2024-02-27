import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar bg-base-300 ">
            <div className="flex-1 ">
                <Image
                    src="/logoipsum-253.svg"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
            </div>
            <div className="flex-none">
                <ul className="menu  menu-horizontal px-1">
                    <li>
                        <Link href={"/login"}>Login</Link>
                    </li>
                    <li>
                        <Link href={"/register"}>Register</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
