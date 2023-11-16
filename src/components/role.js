import React, { useState, useEffect } from 'react';
import { FiHome, FiBook } from 'react-icons/fi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine } from 'react-icons/ri';
import axios from 'axios';
import Host from './api';

export const RoleLinks = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const userid = sessionStorage.getItem('user_id');

        axios.post(`${Host}/GetUserRole`, { user_id: userid })
            .then((res) => {
                let data = res.data;
                if (data.success) {
                    setUserRole(data.events.user_role);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // console.log(userRole)
    switch (userRole) {
        case '1':
            return [
                {
                    title: 'Dashboard',
                    links: [
                        {
                            name: 'HomePage',
                            icon: <FiHome />,
                        },
                        
                    ],
                },
                {
                    title: 'Masters',
                    links: [
                        {
                            name: 'Category',
                            icon: <FiBook />,
                        },
                        {
                            name: 'Users',
                            icon: <IoMdContacts />,
                        },
                        {
                            name: 'Events',
                            icon: <RiContactsLine />,
                        },
                        {
                            name: 'My Events',
                            icon: <RiContactsLine />,
                        },
                        
                    ],
                },
               
            ];

        case '2':
            return [
                {
                    title: 'Dashboard',
                    links: [
                        {
                            name: 'HomePage',
                            icon: <FiHome />,
                        },
                    ],
                },
                {
                    title: 'Masters',
                    links: [
                        {
                            name: 'Category',
                            icon: <FiBook />,
                        },
                        {
                            name: 'My Events',
                            icon: <RiContactsLine />,
                        },
                    ],
                },
            ];

        default:
            return [];
    }
};
