import React, { useState } from 'react'
import bitwalletlogo from "../../Assets/bitwallet.jpg"
import {HiMenuAlt1} from "react-icons/hi" 
import { motion } from 'framer-motion'
import Content from './Content'
const Navbar = () => {
    const [open, setopen] = useState(false);
    return (
        <>
            <nav className="bg-purple-900 text-white md:w-[85vw]  mx-auto top-0">
                <div className="flex items-center font-medium  justify-between w-[100%] bg-purple-900">
                    <div className="z-50 p-5 lg:w-auto w-full flex items-center justify-between">
                        <motion.div
                            whileHover={{
                                scale: 1.08
                            }}
                            className="flex items-center tracking-[3px]">
                            <img src={bitwalletlogo} alt="logo" className="md:mr-3 h-16 w-16 md:cursor-pointer rounded-xl" />
                            <span className="md:text-2xl text-xl">BITWALLET</span>
                        </motion.div>
                        <div className="lg:hidden md:hidden" onClick={() => {
                            setopen(!open);
                        }}>
                            <HiMenuAlt1 name={`${open ? "close" : "menu"}`} className='text-3xl' />
                        </div>
                    </div>
                    <ul className="md:flex hidden text-lg items-center gap-8 bg-purple-900 md:mr-10">
                        <Content />
                    </ul>

                    <ul className={
                        `md:hidden bg-purple-900 absolute w-full top-5 h-full bottom-0 py-24 pl-4
                        duration-500 text-3xl ${open ? "left-0" : "left-[-100%]"}`
                    }>
                        <Content />

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar