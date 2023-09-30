import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri"
const Content = () => {
    const [heading, setheading] = useState();
    const links = [
        {
            name: "Download", submenu: true, sublinks: [
                {
                    head: "Download",
                    sublink: [
                        {
                            name: "For Chrome", link: "https://chrome.google.com/webstore/detail/bit-wallet/ddphokhghjkekfdoddpeffdpojdofcan"
                        },
                        {
                            name: "For IOS", link: "https://apps.apple.com/us/app/be-imagine-technology-wallet/id6443855034"
                        },
                        {
                            name: "For Android", link: "https://play.google.com/store/apps/details?id=beimagine.tech"
                        },
                    ],
                },
            ],
        },
    ];
    return <>
        {
            links.map((link, idx) => (
                <div key={idx} className="bg-purple-900">
                    <div className="px-3 text-left md:cursor-pointer group">
                        <div className="flex items-center hover:text-blue-700 hover:underline justify-between">
                            <h1 className="py-7" onClick={() => setheading(link.name)}>{link.name}</h1>
                            <RiArrowDropDownLine onClick={() => setheading(link.name)} className='text-2xl' />
                        </div>
                        {
                            link.submenu && (
                                <div key={idx} className="">
                                    <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                                        <div className="p-4  shadow-gray-700 shadow-lg bg-slate-900">
                                            {
                                                link.sublinks.map((mysublinks) => (
                                                    <div key={idx}>
                                                        {

                                                            mysublinks.sublink.map((slink,idx) => (
                                                                <li key={idx}  className="text-lg text-white my-2.5 hover:underline hover:text-blue-600">
                                                                    <Link to={slink.link} className="">{slink.name}</Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className={`
                        ${heading === link.name ? 'md:hidden' : 'hidden'
                        }`}>
                        {
                            link.sublinks.map((slinks , idx) => (
                                <div key={idx} className="bg-purple">
                                    <div className="">
                                        <div className="">
                                            {
                                                slinks.sublink.map((slink,idx) => (

                                                    <li key={idx} className="py-3 md:hidden pl-14 text-lg hover:underline hover:text-blue-600">
                                                        <Link to={slink.link}>{slink.name}</Link>
                                                    </li>

                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
    </>
}

export default Content