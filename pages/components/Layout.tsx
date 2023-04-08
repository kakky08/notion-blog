import React, { ReactNode } from 'react'
import Navbar from './Navbar/Navbar';

interface Props {
    children: ReactNode;
  }

function Layout({ children }: Props) {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default Layout;