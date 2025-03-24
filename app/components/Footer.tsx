
"use client"

import { Navbar, Link, NavbarContent, NavbarItem, NavbarBrand, NavbarMenu, NavbarMenuItem, } from "@heroui/react";
import { useState } from "react";
import { FaInstagram } from "react-icons/fa6";

export default function AppNavbar() {

    return (
        <footer className="w-full relative bottom-0">
            <Navbar className="p-12"
                classNames={{
                    wrapper: "flex flex-col sm:flex-row justify-evenly"
                }}

            >

                <NavbarContent className="flex">
                    <p className="font-bold text-inherit">Tây Hồ Budapest Vietnamese Restaurant</p>
                    <NavbarItem isActive>
                        <Link color="foreground" href="https://www.instagram.com/tayhobudapest/" target="_blank">
                            <FaInstagram />
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarBrand>
                </NavbarBrand>
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