import { Button, Image, Link } from "@heroui/react";
import { FaMapLocationDot } from "react-icons/fa6";




export default function Map() {
    return (
        <>
            <div className="flex flex-col items-center gap-12">

                <Button
                    size="lg"
                    className="flex flex-row"
                    endContent={<FaMapLocationDot />}
                >
                    Visit us 
                </Button>

                <Link
                    href="https://maps.app.goo.gl/v1NQtX8qpt8rYW4d7"
                    target="_blank"
                >
                    <Image
                        isZoomed isBlurred
                        src="/location.png"

                    />
                </Link>
            </div>
        </>
    );
}
