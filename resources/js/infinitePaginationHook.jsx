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
    isLoadMoreTop = false
}, ref) {
    let usedUrls = []

    function makeRequest() {
        if (nextPageUrl) {
            request(nextPageUrl)
            usedUrls.push(nextPageUrl)
        }
    }

    function loadMoreHandler () {
        if (isReverseScroll) {
            const target = children ? ref.current : document
            const scrollHeight = children ? target.scrollHeight : document.body.scrollHeight

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
console.log(scrollTop, ' top');
console.log(scrollHeight/3, ' height');
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
        <div ref={ref} className={childrenClassNames + "h-full scrollableChildren overflow-y-auto"}>
            <div className={classes}>
                <div>
                    {!!children && children}
                </div>

                <div className="flex flex-col items-center p-2">
                    {nextPageUrl ? <PrimaryButton type="button" onClick={loadMoreHandler} className="mx-auto">
                        Load More
                    </PrimaryButton> : <div className="py-[17px]"></div>}
                </div>
            </div>
        </div>
    )
})

