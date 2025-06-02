import { useEffect, useRef, useState } from "react";

const useViewAnimation = (threshold = 0.2) => {
    
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        
        const observer = new IntersectionObserver (
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold }
        );

        const currentTarget = ref.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget)  observer.unobserve(currentTarget);
        };

    }, [threshold]);

    return {ref, isVisible};
}  

export default useViewAnimation;