import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Dashboard, Details, Category, Events, TotalUsers, Users, MyEvents, MyEventDetails, Register, Allusers } from './pages'
import { ViewTeams, AddEvent, RoleLinks, CategoryForm, AddnewTeams } from './components'
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
            </Routes>
            {/* </AuthProvider> */}
        </BrowserRouter>

    )
}
export default App;