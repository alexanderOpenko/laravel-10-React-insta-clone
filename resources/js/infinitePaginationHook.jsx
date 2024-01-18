// useInfiniteScroll.js
import { useRef, useEffect } from "react";

export const UseInfiniteScroll = ({ request, nextPageUrl, children, childrenClassNames = '' }) => {
    let usedUrls = [] 
    const scrollRef = useRef(null)
    
    useEffect(() => {
        const onScroll = () => {
        console.log('scroll');

            const refTarget =  scrollRef.current;
            const scrollTop = Math.round(children ?  target.scrollTop : window.scrollY);
            const scrollHeight = children ? target.scrollHeight : document.body.scrollHeight;
            const clientHeight = children ? target.clientHeight : window.innerHeight;
console.log(scrollTop, clientHeight, scrollHeight, 'fffff');
            if (scrollTop + clientHeight >= scrollHeight - 50 && !usedUrls.includes(nextPageUrl)) {
                console.log('tut');
                if (nextPageUrl) {
                    console.log(nextPageUrl, 'nextPageUrll');
                    request(nextPageUrl);
                    usedUrls.push(nextPageUrl);
                }
            }
        };

        const target = children ? scrollRef.current : document;
        console.log(target, 'target');
         target.addEventListener('scroll', onScroll);
        
        return () => {
            target.removeEventListener('scroll', onScroll);
        };
    }, [nextPageUrl]);

    return (
        <div ref={scrollRef} className={childrenClassNames + " scrollableChildren overflow-y-auto"}>
             {!!children && children}
        </div>
    )
}


