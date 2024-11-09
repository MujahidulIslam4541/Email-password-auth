import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'

export default function Main() {
    return (
        <div className='max-w-4xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    )
}
