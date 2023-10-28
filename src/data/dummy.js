import React from 'react';
import { FiHome, FiBook, FiBarChart, FiCreditCard } from 'react-icons/fi';
import { BsBoxSeam, BsCurrencyDollar, BsShield } from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';
import { GoDotFill } from 'react-icons/go';
import { RiContactsLine } from 'react-icons/ri';
import { MdOutlineSupervisorAccount } from 'react-icons/md';

export const Rules = [
  {
    icon: <GoDotFill />,
    rule: 'This Learnathon Event is applicable to all S3 and S5 Students.',
  },
  {
    icon: <GoDotFill />,
    rule: 'Duration of the Learnathon is 8 Hours.',
  },
  {
    icon: <GoDotFill />,
    rule: 'There will be two levels for this competition, and RP will be awarded only if the group participates in both the levels.',
  },
  {
    icon: <GoDotFill />,
    rule: 'The main objective of this competition is to check the conceptual understanding of fundamental courses.',
  },
  {
    icon: <GoDotFill />,
    rule: 'Each team can have 3 Members maximum. Students may also participate as Individual or group of 2 members. For group teams, the RP will be shared.',
  },
  {
    icon: <GoDotFill />,
    rule: 'Each group will be given a Topic from Fundamental Courses.',
  },
  {
    icon: <GoDotFill />,
    rule: 'The group has to Explore the fundamental concepts related to the given topic and need to prepare Higher order thinking Questions as per the format.',
  },
  {
    icon: <GoDotFill />,
    rule: 'A group can prepare any number of Questions from the same topic.',
  },
  {
    icon: <GoDotFill />,
    rule: 'If many groups select the same topic, the RP will be shared among groups.',
  },
  {
    icon: <GoDotFill />,
    rule: 'A group can register for a maximum of two topics.',
  },
  {
    icon: <GoDotFill />,
    rule: 'These Questions will be shared among the peer groups for evaluation in terms of Quality, Clarity, and Knowledge.',
  },
  {
    icon: <GoDotFill />,
    rule: 'If the Test item passes the random peer group evaluation, it will be considered for assessment in the next level.',
  },
  {
    icon: <GoDotFill />,
    rule: 'The test item will be rejected  if nobody could answer it or everybody could answer it.',
  },
  {
    icon: <GoDotFill />,
    rule: 'A registration form will be circulated to all the students along with fundamental courses. Topics related to selected courses will be given at the event venue.',
  },
  {
    Description: 'Mathematics, Physics, Chemistry, Basics of Computers, Fundamentals of Electronics Engineering, Fundamentals of Electrical Engineering, Digital Electronics , Analog Electronics, Data Structures, Database, Computer Architecture, Operating Systems, Software Engineering, Computer Networks, Web frameworks, Engineering Thermodynamics'
  }

];

export const getLinksBasedOnUserRole = (userRole) => {
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

export const links = [
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












export const HomePageData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: '39',
    percentage: '-4%',
    title: 'Total Teams',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    icon: <BsBoxSeam />,
    amount: '43',
    percentage: '+23%',
    title: 'Total Problems',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
    pcColor: 'green-600',
  },
  {
    icon: <FiBarChart />,
    amount: '10',
    percentage: '+38%',
    title: 'Registered Count',
    iconColor: 'rgb(228, 106, 118)',
    iconBg: 'rgb(255, 244, 229)',
    pcColor: 'green-600',
  },
  // {
  //   icon: <HiOutlineRefresh />,
  //   amount: '33',
  //   percentage: '-12%',
  //   title: 'Available count',
  //   iconColor: 'rgb(0, 194, 146)',
  //   iconBg: 'rgb(235, 250, 242)',
  //   pcColor: 'red-600',
  // },
];
export const CategoryData = [

  {
    title: 'Software Engineering',
    Incharge: 'Sathish',
    Description: 'Software Engineering agile method',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    RegisteredTeams: '5',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
  {
    title: 'Operating System',
    Incharge: 'Sathish',
    Description: 'Operating System',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    RegisteredTeams: '5',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    title: 'Computer Networks',
    Incharge: 'Sathish',
    Description: 'Compter Networks',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    RegisteredTeams: '5',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    title: 'Database Management',
    Incharge: 'Sathish',
    Description: 'Database Management Sql',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    RegisteredTeams: '5',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    title: 'Internet Of Things',
    Incharge: 'Sathish',
    Description: 'Internet of Things',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    RegisteredTeams: '5',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
  {
    title: 'Machine Learning',
    Incharge: 'Sathish',
    Description: 'Machine Learning Ai',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    RegisteredTeams: '5',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
    pcColor: 'red-600',
  },
];
export const MyDetails = [
  {
    title: 'Software Engineering',
    Incharge: 'Sathish',
    Description: 'Software engineering is the disciplined application of systematic, scalable approaches to the design, development, testing, and maintenance of software systems. It encompasses a wide range of techniques, tools, and methodologies to create reliable, efficient, and maintainable software solutions. Engineers in this field employ coding languages like Java, Python, and C++ to translate conceptual designs into functional applications. Additionally, they utilize version control systems and collaborative platforms to manage and track the progress of projects. Continuous integration and agile development practices are central tenets, ensuring adaptability and responsiveness in the ever-evolving landscape of software development.',
    TeamsCount: '3',
    TeamLeaderName: 'Poovarasan',
    TeamMember1: 'Poovarasan',
    TeamMember2: 'Poovarasan',
    TeamMember3: 'Poovarasan',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  }
]


export const DetailsData = [
  {
    title: 'Software Engineering',
    Incharge: 'Sathish',
    Description: 'Software engineering is the disciplined application of systematic, scalable approaches to the design, development, testing, and maintenance of software systems. It encompasses a wide range of techniques, tools, and methodologies to create reliable, efficient, and maintainable software solutions. Engineers in this field employ coding languages like Java, Python, and C++ to translate conceptual designs into functional applications. Additionally, they utilize version control systems and collaborative platforms to manage and track the progress of projects. Continuous integration and agile development practices are central tenets, ensuring adaptability and responsiveness in the ever-evolving landscape of software development.',
    Deadline: '20-10-2023',
    MaxTeams: '10',
    MinTeams: '5',
    RegisteredTeamsCount: '5',
    PerTeam: '3',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },
];
export const RegisteredTeamsData = [
  {
    SNo: 1,
    TeamId: 'LI201',
    TeamName: 'Red Rose',
    Category: 'Software Engineering',
    TeamSize: '6',
    TeamLeaderName: 'Poovarasan',
    TeamLeaderMobile: '8667536844',
  },
];

export const EventsData = [

  {
    title: 'Learnathon 2023',
    Incharge: 'Sathish',
    Description: 'Software engineering is the disciplined application of systematic',
    EventsDate: '20-10-2023',

    RegisteredTeamsCount: '5',
    MaxTeams: '100',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
    pcColor: 'red-600',
  },


];












export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <FiCreditCard />,
    title: 'My Tasks',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];
