import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard, Details, Category, Events, TotalUsers, Users, AnswerQuestion, MyEvents, MyEventDetails, Register, Allusers, MyQuestions, TotalQuestions, MCQ ,Mcqevaltuion} from './pages'
import { ViewTeams, AddEvent, RoleLinks, CategoryForm, Question, Editor, AddnewTeams, NotFound } from './components'
import Auth from './auth/login';
function App() {
    return (
        <BrowserRouter>
            {/* <AuthProvider> */}
            <Routes>
                {/* Dashboard part */}
                <Route path="/" element={<Auth />} />
                <Route path="/HomePage" element={<Dashboard />} />
                {/* pages */}
                <Route path="/Details/:categoryId" element={<Details />} />
                <Route path="/Register/:categoryId" element={<Register />} />
                <Route path="/Category" element={<Category />} />
                <Route path="/Events" element={<Events />} />
                <Route path="/ViewTeams" element={<ViewTeams />} />
                <Route path="/AddEvent" element={<AddEvent />} />
                <Route path="/TotalUsers" element={<TotalUsers />} />
                <Route path="/CategoryForm" element={<CategoryForm />} />
                <Route path="/AddnewTeams" element={<AddnewTeams />} />
                <Route path="/Users" element={<Users />} />
                <Route path='/My Events' element={<MyEvents />} />
                <Route path='/login' element={<Auth />} />
                <Route path='/MyEventDetails' element={<MyEventDetails />} />
                {/* Apps */}
                <Route path="/register" element={<Register />} />
                <Route path="/Links" element={<RoleLinks />} />
                <Route path="/Users" element={<Allusers />} />
                <Route path="Text Editor/:categoryId" element={<Editor />} />
                <Route path="Create Questions" element={<Question />} />
                <Route path="My Questions" element={<MyQuestions />} />
                <Route path="Total Questions" element={<TotalQuestions />} />
                <Route path="Peer Evalution" element={<AnswerQuestion />} />
                <Route path="Multiple Choice" element={<MCQ />} />
                <Route path="MCQ Evalution" element={<Mcqevaltuion/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
            {/* </AuthProvider> */}
        </BrowserRouter>

    )
}
export default App;