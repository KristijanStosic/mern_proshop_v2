const Backdrop = ({ onClick }) => {
    return (
    <div onClick={onClick} 
        className="z-1 
        bg-slate-200 
        opacity-50 
        w-screen 
        h-screen 
        fixed 
        top-0 
        left-0
        cursor-pointer
        "
    > 
    </div>
    )
}

export default Backdrop