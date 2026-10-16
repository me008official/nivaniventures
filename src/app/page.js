import Footer from '@/component/home/fixed/Footer'
import Header from '@/component/home/fixed/Header'
import ContactBanner from '@/component/home/landing/ContactBanner'
import Customize from '@/component/home/landing/Customize'
import Founder from '@/component/home/landing/Founder'
import Hero from '@/component/home/landing/Hero'
import Products from '@/component/home/landing/Products'
import Services from '@/component/home/landing/Services'
import Testimonials from '@/component/home/landing/Testimonials'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header/>
      <Hero/>
      <Products/>
      <Services/>
      <Customize/>
      <Testimonials/>
      <Founder/>
      {/* <ContactBanner/> */}
      <Footer/>
    </div>
  )
}
