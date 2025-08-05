import type { ReactNode } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface IProps{
    children:ReactNode
}

const RootLayout = ({children}:IProps) => {
  return (
     <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow-1">{children}</main>
      <Footer />
    </div>
  )
}

export default RootLayout