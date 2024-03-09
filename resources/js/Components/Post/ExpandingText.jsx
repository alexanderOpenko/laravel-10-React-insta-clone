import classNames from "classnames"
import { useState } from "react"

export default function ExpandingText (props) {
    const { text } = props
    const [isExpanded, setIsExpanded] = useState(false)

    const expandTextHandler = () => {
        setIsExpanded(true)
    }

    const classes = classNames({
        "break-words":isExpanded, 
        "max-h-[30px] text-ellipsis overflow-hidden truncate max-w-[80%]": !isExpanded,
        // "float-left": text.length > 50 && !isExpanded
    })

    return <div {...props}>
        <div className={classes}>
            { text }
        </div>
        
        {(text.length > 50 && !isExpanded) && <div onClick={expandTextHandler} className="cursor-pointer text-slate-500 z-[100] relative">
            show more
        </div>}
    </div>
}