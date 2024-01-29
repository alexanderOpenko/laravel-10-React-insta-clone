// useInfiniteScroll.js
import { useRef, useEffect, forwardRef } from "react";

export default forwardRef(function UseInfiniteScroll ({
    request,
    nextPageUrl,
    children,
    childrenClassNames = '',
    isReverseScroll = false
}, ref) {
    let usedUrls = []
    
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = Math.round(children ? target.scrollTop : window.scrollY)
            const scrollHeight = children ? target.scrollHeight : document.body.scrollHeight
            const clientHeight = children ? target.clientHeight : window.innerHeight

            if (!isReverseScroll && scrollTop + clientHeight >= scrollHeight - 50 && !usedUrls.includes(nextPageUrl)) {
                makeRequest()
            }

            if (isReverseScroll && scrollTop <= 200 && !usedUrls.includes(nextPageUrl)) {
                makeRequest()
            }
        }

        function makeRequest() {
            if (nextPageUrl) {
                request(nextPageUrl)
                usedUrls.push(nextPageUrl)
            }
        }

        const target = children ? ref.current : document
        target.addEventListener('scroll', onScroll)

        return () => {
            target.removeEventListener('scroll', onScroll)
        }
    }, [nextPageUrl])

    return (
        <div ref={ref} className={childrenClassNames + " scrollableChildren overflow-y-auto"}>
            {!!children && children}
        </div>
    )
})

