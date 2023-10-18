const UserMenuItem = ({ onClick, children, icon }) => {
    return ( 
        <div onClick={onClick} className="flex items-center px-4 py-3 hover:bg-slate-200 transition">
            {icon && icon} {children}
        </div>
     )
}
 
export default UserMenuItem