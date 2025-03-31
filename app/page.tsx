"use client"

import { Path } from "./constants";
import { ReservationForm } from "./components/main/ReservationForm";
import Footer from "./components/Footer";
import Welcome from "./components/main/Welcome";
import About from "./components/main/About/Map";
import { AppNavbarDesktop, AppNavbarMobile } from "./components/NavBar/Navbar";
import Gallery from "./components/main/Gallery/Gallery";
import { useIsMobile } from "./components/common/device";


export default function Main() {

  const { isMobile } = useIsMobile();


  return (
    <>
      <div
        className="flex flex-col items-center justify-items-center min-h-screen 
          sm:max-w-[60%] font-[family-name:var(--font-geist-sans)]"
      >

        {isMobile ? <>
          <AppNavbarMobile />
          <div id={"welcomeAnchor"} style={{}}></div>
        </> : <></>}

        <Welcome />
        <div id={""} className="max-[600px]:hidden mt-[64px] sm:mt-[128px]">&nbsp;&nbsp;</div>
        {!isMobile ? <AppNavbarDesktop /> : <></>}
        <div className="flex flex-col items-center justify-items-center w-full
                        sm:mx-[2%] sm:gap-16 paper-scroll">


          <div id={'gallery'} className="mb-[128px] sm:mb-[256px]">&nbsp;&nbsp;</div>
          <Gallery />

          {/* <div id={Path.Reservation} className="mb-[256px]">&nbsp;&nbsp;</div>
            <ReservationForm /> */}

          <div id={Path.About} className="mb-[128px] sm:mb-[256px]">&nbsp;&nbsp;</div>
          <About />
          <div id={""} className="mb-[128px] sm:mb-[256px]">&nbsp;&nbsp;</div>
        </div>

      </div>
      <Footer />
    </>
  );
}
