import { useState, useEffect } from "react";


export const useIsMobile = () => {

    const [isMobile, setIsMobile] = useState(false);

    const checkMobile = (userAgent: string) => {
        const check = /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
        setIsMobile(check);
    };

    useEffect(() => {
        checkMobile(navigator.userAgent);
    });
    return { isMobile };
};
