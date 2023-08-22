import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const Layout = () => {
  return (
    <Fragment>
      <NavBar />
      <br />
      <Outlet />
    </Fragment>
  )
}

export default Layout