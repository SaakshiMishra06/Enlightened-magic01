import React from 'react'
import Navbar from './components/Navbar'
import ScrollytellingHero from './components/ScrollytellingHero'
import Work from './components/Work'
import Services from './components/Services'
import About from './components/About'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <ScrollytellingHero />
        <Work />
        <Services />
        <About />
      </main>
      <Footer />
    </>
  )
}

export default App
