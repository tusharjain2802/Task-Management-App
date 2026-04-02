import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateLayout from "./Layout/PrivateLayout";
import HomePage from "./Pages/Home";
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import TaskList from './Pages/TaskList';

const AllRoutes: React.FC = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <PrivateLayout>
                        <HomePage />
                    </PrivateLayout>
                }
            />
             <Route
                path="/login"
                element={
                    <PrivateLayout>
                        <LoginForm />
                    </PrivateLayout>
                }
            />
             <Route
                path="/register"
                element={
                    <PrivateLayout>
                        <RegisterForm />
                    </PrivateLayout>
                }
            />
            <Route
                path="/tasklist"
                element={
                    <PrivateLayout>
                        <TaskList />
                    </PrivateLayout>
                }
            />
        </Routes>
        </BrowserRouter>
    );
}

export default AllRoutes;
