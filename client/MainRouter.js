import React from 'react'
import {Route, BrowserRouter } from 'react-router-dom'
import Home from './core/Home'


const MainRouter = () => {
    return (<div>
      <Menu/>
      <BrowserRouter>
        <Route exact path="/" element={Home}/>
      </BrowserRouter>
    </div>)
}

export default MainRouter