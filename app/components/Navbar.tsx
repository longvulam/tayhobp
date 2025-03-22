
"use client"

import { Navbar, Link, NavbarContent, NavbarItem } from "@heroui/react";
import { Path } from "../constants";
import { useEffect, useState } from "react";

export default function AppNavbar() {

    const [currentHash, setCurrentHash] = useState(window.location.hash)
    useEffect(()=>{
        const updateHash = () => setCurrentHash(window.location.hash);
        window.addEventListener("hashchange", updateHash)
        return () => window.removeEventListener("hashchange", updateHash);
    }, [])
    
    return (
        <Navbar shouldHideOnScroll={false} className="p-12" classNames={{}}>
            <NavbarContent className="hidden w-full sm:flex flex" style={{ justifyContent: "space-evenly" }}>

                <NavbarItem isActive={[`#`, ''].includes(currentHash)}>
                    <Link color="foreground" href={`${Path.Home}`}>Home</Link>
                </NavbarItem>

                <NavbarItem isActive={currentHash == `#${Path.Reservation}`}>
                    <Link color="foreground" href={`#${Path.Reservation}`}>Reserve with Us</Link>
                </NavbarItem>

                <NavbarItem isActive={currentHash == `#${Path.About}`}>
                    <Link color="foreground" href={`#${Path.About}`}>About</Link>
                </NavbarItem>

            </NavbarContent>

            {/* <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent> */}
        </Navbar>
    )
}