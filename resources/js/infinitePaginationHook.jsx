// useInfiniteScroll.js
import { useRef, useEffect } from "react";

export const UseInfiniteScroll = ({ request, nextPageUrl, children }) => {
    let usedUrls = [] 
    const scrollRef = useRef(null)
    
    useEffect(() => {
        const onScroll = () => {
            const refTarget =  scrollRef.current;
            const scrollTop = Math.round(children ?  target.scrollTop : window.scrollY);
            const scrollHeight = children ? target.scrollHeight : document.body.scrollHeight;
            const clientHeight = children ? target.clientHeight : window.innerHeight;

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
         target.addEventListener('scroll', onScroll);
        
        return () => {
            target.removeEventListener('scroll', onScroll);
        };
    }, [nextPageUrl]);

    return (
        <div ref={scrollRef} className="followers_list max-h-96 h-full overflow-y-auto">
             {!!children && children}
        </div>
    )
}
