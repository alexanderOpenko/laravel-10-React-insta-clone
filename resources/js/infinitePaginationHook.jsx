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
        const target = ref.current

        if (target && nextPageUrl) {
            const scrollTopReal = Math.round(target.scrollTop)

            if (!scrollTopReal) {
                target.scrollTop = target.scrollHeight / 6
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
                console.log(scrollTop, 'scrollTop');

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
        <div ref={ref} className={childrenClassNames + " h-full scrollableChildren overflow-y-auto"}>
            <div className={classes + bodyClasses}>
                <div>
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

