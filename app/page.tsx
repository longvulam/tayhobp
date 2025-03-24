"use client"

import { Path } from "./constants";
import { ReservationForm } from "./components/main/ReservationForm";
import Footer from "./components/Footer";
import Welcome from "./components/main/Welcome";
import About from "./components/main/About/Map";
import { AppNavbarDesktop, AppNavbarMobile } from "./components/NavBar/Navbar";
import { Card, CardBody } from "@heroui/react";


export default function Main() {
  return (
    <>

          <div 
          // className="flex flex-col items-center justify-items-center min-h-screen 
          // px-[5%] sm:px-[2%] sm:gap-16  font-[family-name:var(--font-geist-sans)]
          // w-full"
          className="flex flex-col items-center justify-items-center min-h-screen 
          px-[5%] sm:px-[2%] sm:gap-16  font-[family-name:var(--font-geist-sans)]
          w-full"
          >

            <AppNavbarMobile />

            <div id={"welcomeAnchor"} style={{}}></div>
            <Welcome />
            <div id={""} className="max-[600px]:hidden" style={{ marginTop: 128 }}>&nbsp;&nbsp;</div>

            <AppNavbarDesktop />

            <div id={Path.Reservation} style={{ marginBottom: 256 }}>&nbsp;&nbsp;</div>
            <ReservationForm />

            <div id={Path.About} style={{ marginBottom: 256 }}>&nbsp;&nbsp;</div>
            <About />
            <div id={""} style={{ marginBottom: 256 }}>&nbsp;&nbsp;</div>

          </div>
      <Footer />
    </>
  );
}
