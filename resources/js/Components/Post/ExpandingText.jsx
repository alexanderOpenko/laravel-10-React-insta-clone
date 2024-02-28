import classNames from "classnames"
import { useState } from "react"

export default function ExpandingText ({ text }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const expandTextHandler = () => {
        setIsExpanded(true)
    }

    const classes = classNames({
        "break-words":isExpanded, 
        "max-h-[30px] text-ellipsis overflow-hidden truncate max-w-[65%]": !isExpanded,
        "float-left": text.length > 50 && !isExpanded
    })

    return <div>
        <div className={classes}>
            { text }
        </div>
        
        {(text.length > 50 && !isExpanded) && <div onClick={expandTextHandler} className="cursor-pointer text-slate-500">
            show more
        </div>}
    </div>
}