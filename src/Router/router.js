import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateQuestion from '../views/CreateQuestion';
import Home from '../views/Home';
import PLay from '../views/Play';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateQuestion />} />
                <Route path="/play" element={<PLay />} />
            </Routes>
      </BrowserRouter>
    )
}

export default Router;