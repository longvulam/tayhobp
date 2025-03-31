"use client"

import styles from "./welcome.module.css";
import React, { useMemo } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { shuffle } from "../common/array";
import { Image } from "@heroui/react";

const imgs = [
    // 'banh_mi.jpg',
    'keverrek_tal.jpg',
    'nom_salata.jpg',
    'padthai_marhahussal.jpg',
    'rak_szirmok.jpg',
    'tavaszi_tekercs.jpg',
    'tayho_tal_salata.jpg',
    'zold_rak.jpg',

]

export const FlavourText = (props: { size: number, text?: string }) => {
    const { size, text } = props;

    return <div className={styles.flavorTextCard}>
        <span className={`text-${size}xl sm:text-${size + 2}xl leading-loose font-bold ${styles.flavorTextBody}`}>
            {text ?? (<>
                Flavors from Vietnam
                <br />
                Tây Hồ Budapest
            </>)}
        </span>
    </div>
};

export default function Welcome() {

    const imgNames = useMemo(() => {
        return ['food_wolt_banner.jpg', ...shuffle(imgs)]
    }, []);

    return (
        <div className={`bg-background/60 dark:bg-default-100/50 w-full relative`}>
            <FlavourText size={3} />

            <Swiper
                loop={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                // wrapperClass="w-full"
                // slideClass="w-full"
                className={`${styles.swiper} w-full sm:h-[500px]`}
            >
                {imgNames.map(img =>
                    <SwiperSlide key={img} className={styles.slide}>
                        <Image
                            alt=""
                            className={`w-full ${styles.slideImg}`}
                            src={`/assets/slideshow/${img}`} />

                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}