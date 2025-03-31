
"use client"

import { Navbar, Link, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Path } from "../../constants";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { FlavourText } from "../main/Welcome";


const HomeLink = <Link isBlock color="foreground" href={`${Path.Home}`}>Home</Link>;
const ReservationLink = <Link isBlock color="foreground" href={`#${Path.Reservation}`}>Reserve with Us</Link>
const GalleryLink = <Link isBlock color="foreground" href={`#${Path.Gallery}`}>Gallery</Link>
const AboutLink = <Link isBlock color="foreground" href={`#${Path.About}`}>About</Link>

export function AppNavbarDesktop() {

    const [currentHash, setCurrentHash] = useState('')

    useEffect(() => {
        const updateHash = () => setCurrentHash(location.hash);

        addEventListener("hashchange", updateHash)
        return () => removeEventListener("hashchange", updateHash);
    }, [])

    // bg-gradient-to-tr from-[#FFB457] to-[#FF705B]
    return (
        <Navbar shouldHideOnScroll={false}
            className={`w-screen sm:w-full ${styles.navbarWrap}`}
                //  dark:bg-default-100/50 
                 
            classNames={{
                base: "max-[600px]:hidden",
                wrapper: "",
                item:"font-bold",
            }}
        >
            <NavbarContent className="w-full sm:flex" style={{ justifyContent: "space-evenly" }}>
                <NavbarItem isActive={[`#`, ''].includes(currentHash)}>
                    {HomeLink}
                </NavbarItem>
                
                <NavbarItem isActive={currentHash == `#${Path.Gallery}`}>
                    {GalleryLink}
                </NavbarItem>
                {/* <NavbarItem isActive={currentHash == `#${Path.Reservation}`}>
                    {ReservationLink}
                </NavbarItem> */}

                <NavbarItem isActive={currentHash == `#${Path.About}`}>
                    {AboutLink}
                </NavbarItem>

            </NavbarContent>

        </Navbar>
    )
}


export function AppNavbarMobile() {

    const [currentHash, setCurrentHash] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const updateHash = (event: Event) => setCurrentHash(location.hash);
        const onScrollEnd = (event: Event): void => setIsMenuOpen(false);

        addEventListener("hashchange", updateHash)
        addEventListener("scrollend", onScrollEnd);
        return () => {
            removeEventListener("hashchange", updateHash);
            removeEventListener("scrollend", updateHash);
        }
    }, [])


    return (<>
        <Navbar
            isBlurred
            shouldHideOnScroll={false}
            className={`w-screen ${styles.navbarWrap}`}
            classNames={{
                base: "sm:hidden",
                // wrapper: styles.navbarWrap
            }}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >

            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
            <NavbarContent >
                <NavbarItem isActive={[`#`, ''].includes(currentHash)}>
                    <FlavourText size={1} text="Tây Hồ Budapest" />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu >
                <NavbarMenuItem isActive={currentHash == `#${Path.Home}`}>
                    {HomeLink}
                </NavbarMenuItem >
                {/* <NavbarMenuItem isActive={currentHash == `#${Path.Reservation}`}>
                    {ReservationLink}
                </NavbarMenuItem> */}
                <NavbarItem isActive={currentHash == `#${Path.Gallery}`}>
                    {GalleryLink}
                </NavbarItem>
                <NavbarMenuItem isActive={currentHash == `#${Path.About}`}>
                    {AboutLink}
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
        

    </>
    )
}