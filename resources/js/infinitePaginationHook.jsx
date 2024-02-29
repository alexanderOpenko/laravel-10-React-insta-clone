// useInfiniteScroll.js
import { useEffect, forwardRef } from "react";
import PrimaryButton from "./Components/PrimaryButton";
import classNames from "classnames";

export default forwardRef(function UseInfiniteScroll({
    request,
    nextPageUrl,
    children,
    childrenClassNames = '',
    isReverseScroll = false,
    isLoadMoreTop = false, 
    bodyClasses = ''
}, ref) {
    let usedUrls = []

    if (isReverseScroll) {
        if (ref.current && nextPageUrl) {
            const scrollTopReal = Math.round(ref.current.scrollTop)

            if (!scrollTopReal) {
                ref.current.scrollTop = 50
            }
        }
    }

    function makeRequest () {
        if (nextPageUrl) {
            request(nextPageUrl)
            
            usedUrls.push(nextPageUrl)          
        }
    }

    function loadMoreHandler () {
        if (isReverseScroll) {
            const target = children ? ref.current : document

            target.scrollTop = 50
        }

        makeRequest()
    }

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = Math.round(children ? target.scrollTop : window.scrollY)
            const scrollHeight = children ? target.scrollHeight : document.body.scrollHeight
            const clientHeight = children ? target.clientHeight : window.innerHeight

            if (!isReverseScroll && scrollTop + clientHeight >= scrollHeight - 150 && !usedUrls.includes(nextPageUrl)) {
                makeRequest()
            }

            if (isReverseScroll && scrollTop <= (scrollHeight / 3) && !usedUrls.includes(nextPageUrl)) {
                makeRequest()
            }
        }

        const target = children ? ref.current : document
        target.addEventListener('scroll', onScroll)

        return () => {
            target.removeEventListener('scroll', onScroll)
        }
    }, [nextPageUrl])

    const classes = classNames({
        "flex flex-col-reverse": isLoadMoreTop,
        "pb-[80px]": !children
    })

    return (
        <div ref={ref} className={childrenClassNames + " scrollableChildren overflow-y-auto"}>
            <div className={classes + bodyClasses}>
                <div className="min-h-full flex flex-col justify-end">
                    {!!children && children}
                </div>

                {nextPageUrl && <div className="flex flex-col items-center py-4 p-2">
                     <PrimaryButton type="button" onClick={loadMoreHandler} className="mx-auto">
                        Load More
                    </PrimaryButton>
                </div>}
            </div>
        </div>
    )
})

