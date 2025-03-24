"use client"

import styles from "./welcome.module.css";
import { Image } from "@heroui/react";
import React from "react";

export default function Welcome() {

    return (
        <div className={`grid sm:grid-cols-2 ${styles.imgWrap}`}>

            <h2 className={`flex h-full justify-end sm:text-right
             items-center text-3xl sm:text-4xl leading-loose font-bold ${styles.flavorText}`}>
                Flavors from Vietnam
                <br />
                Tây Hồ Budapest
            </h2>

            <div className={`sm:hidden ${styles.croppedImgMobile}`} >&nbsp;&nbsp;</div>
            <div className={`hidden sm:inline-flex ${styles.croppedImg}`} >&nbsp;&nbsp;</div>

        </div>
    )
}