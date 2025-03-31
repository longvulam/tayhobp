

import Image from "next/image";
import {
    RenderImageContext,
    RenderImageProps,
    MasonryPhotoAlbum,
    ColumnsPhotoAlbum,
    RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/styles.css";
import { useEffect, useMemo, useState } from 'react';
import PhotoAlbum from "react-photo-album";
import styles from './Gallery.module.css'
import { useIsMobile } from "../../common/device";
import { shuffle } from "../../common/array";

function renderNextImage(
    { alt = "", title, sizes }: RenderImageProps,
    { photo, width, height }: RenderImageContext,
) {
    return (
        <div
            style={{
                width: width,
                // scale: '0.5',
                position: "relative",
                aspectRatio: `${width} / ${height}`,
            }}
        >
            <Image
                src={photo}
                alt={alt}
                title={title}
                sizes={sizes}
                placeholder={"blurDataURL" in photo ? "blur" : undefined}
            />
        </div>
    );
}

export default function PhotoGallery() {
    const { isMobile } = useIsMobile();
    const [imageFiles, setImageFiles] = useState<string[]>([])

    useEffect(() => {
        fetch('/api/images')
            .then(resp => resp.json())
            .then((list) => {
                setImageFiles(list);
            });
    }, [])

    const photos = useMemo(() => shuffle(imageFiles.map(filename => ({
        src: `/assets/gallery/${filename}`,
        width: isMobile ? 800 : 600,
        height: 400,
    }))), [imageFiles, isMobile]);

    return (
        <div className={`w-full p-[12px] max-h-[1200px] overflow-x-scroll ${styles.container}`}>
            <PhotoAlbum
                photos={photos}
                layout="masonry"
                columns={isMobile ? 1 : 3}
                spacing={8}
                padding={5}
                render={{
                    image: renderNextImage,
                    wrapper: ({ style, ...rest }) => (
                        <div
                            style={{
                                ...style,
                                borderRadius: 5 > 2 ? "4px" : 0,
                                boxShadow:
                                    8 + 5 > 0
                                        ? "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)"
                                        : "none",
                                transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                            }}
                            {...rest}
                        />
                    ),
                }}
                defaultContainerWidth={1200}
                sizes={{
                    size: "1200px",
                    sizes: [
                        { viewport: "(max-width: 100%)", size: "calc(100% - 32px)" },
                        // { viewport: "(max-width: 600px)", size: "calc(100vw - 32px)" },
                    ],
                }}
            />
        </div>
    );
}
