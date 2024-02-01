export default function Content({ children }) {
    return (
        <div className="py-3 md:py-6 lg:py-8">
            <div className="max-w-5xl mx-auto px-0 md:px-5 lg:px-6">
                {children}
            </div>
        </div>
    )
}