// useInfiniteScroll.js
import { useRef, useEffect, forwardRef } from "react";
import PrimaryButton from "./Components/PrimaryButton";

export default forwardRef(function UseInfiniteScroll({
    request,
    nextPageUrl,
    children,
    childrenClassNames = '',
    isReverseScroll = false,
    isLoadMoreTop = false
}, ref) {
    let usedUrls = []

    function makeRequest() {
        if (nextPageUrl) {
            request(nextPageUrl)
            usedUrls.push(nextPageUrl)
        }
    }

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

        const target = children ? ref.current : document
        target.addEventListener('scroll', onScroll)

        return () => {
            target.removeEventListener('scroll', onScroll)
        }
    }, [nextPageUrl])

    return (
        <div ref={ref} className={childrenClassNames + " scrollableChildren overflow-y-auto"}>
            <div className={isLoadMoreTop && "flex flex-col-reverse"}>
                <div>
                    {!!children && children}
                </div>

                <div className="flex flex-col items-center p-2">
                    {nextPageUrl && <PrimaryButton type="button" onClick={makeRequest} className="mx-auto">
                        Load More
                    </PrimaryButton>}
                </div>
            </div>
        </div>
    )
})

