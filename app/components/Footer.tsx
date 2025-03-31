
"use client"

import { Navbar, Link, NavbarContent, NavbarItem, } from "@heroui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

export default function AppNavbar() {

    return (
        <footer className="w-full relative bottom-0">
            <Navbar className="p-12"
                classNames={{
                    wrapper: "flex flex-col sm:flex-row justify-evenly"
                }}

            >

                <NavbarContent className="flex">
                    <NavbarItem isActive>
                        <p className="font-bold text-inherit">
                            Tây Hồ Budapest Vietnamese Restaurant
                        </p>
                        <p className="text-gray-300">Opening Hours:</p>
                        <p className="text-gray-300">Mon - Fri 10am - 10pm</p>
                        <p className="text-gray-300">Ó Street 23.</p>
                        <p className="text-gray-300">1066, Budapest</p>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="flex" justify="center">
                    <NavbarItem>
                        <Link color="foreground" href="https://www.instagram.com/tayhobudapest/" target="_blank">
                            <FaInstagram />
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="https://www.facebook.com/TayHoRestaurantBudapest/" target="_blank">
                            <FaFacebook />
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                {/* <NavbarBrand>
                </NavbarBrand> */}
                <NavbarContent justify="end">
                    <NavbarItem>
                        <p className="text-inherit">
                            &copy; 2019 - {new Date().getFullYear()} PHONIX RESTAURANT KFT.
                        </p>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </footer>
    )
}