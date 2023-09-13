import React from 'react';
import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { PrivateRoute } from './components';
import { Home, Login, Dashboard } from './pages';

function App() {
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentFilters, setCurrentFilters] = useState({
    completed: false,
    createdBy: false,
    assignedTo: false
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Outlet />}>
        <Route index={true} path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
  
        {/* Private Routes */}
        <Route path='' element={ <PrivateRoute setCurrentCategory={setCurrentCategory} /> }>
          <Route path='/dashboard' element={<Dashboard currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} currentFilters={currentFilters} setCurrentFilters={setCurrentFilters} />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
