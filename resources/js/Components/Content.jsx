export default function Content({ children }) {
    return (
        <div className="py-12">
            <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                {children}
            </div>
        </div>
    )
}