import React, { PropsWithChildren } from 'react'
import Header from './Header'


const Layout = ({children} : PropsWithChildren) => {
  
  return (
    <div className = "bg-gradient-to-br from-backgound to-muted">
       <Header/> 
       <main className = "min-h-screen container mx-auto px-4 py-8">
       {children}

       </main>
       <footer className="border-t backdrop-blur py-12">
        <div className="container mx-auto px-4 text-center text-gray-400 supports-[backdrop-filter]:bg-background/60">
            <p>Made By Ahmed Magdy</p>
        </div>
       </footer>
    </div>
  )
}

export default Layout
