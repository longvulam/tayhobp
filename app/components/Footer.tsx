
"use client"

import { Navbar, Link, NavbarContent, NavbarItem, Button, NavbarBrand } from "@heroui/react";

export default function AppNavbar() {

    return (
        <footer className="w-full">
            <Navbar className="p-12"
                classNames={{
                    wrapper: "flex justify-evenly"
                }}>
                <NavbarBrand>
                    <p className="font-bold text-inherit">Tay Ho BP</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center" >
                    <NavbarItem isActive>
                        <Link color="foreground" href="/">Social Media</Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <p className="font-bold text-inherit">Year TM</p>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </footer>
    )
}