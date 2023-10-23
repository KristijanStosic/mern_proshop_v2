const Button = ({
    type,
    buttonText,
    disabled,
    outline,
    small,
    icon,
    onClick,
}) => {
    return (
    <button 
    type={type}
    onClick={onClick}
    disabled={disabled} 
    className={`
    disabled:opacity-75 
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-75 
    transition 
    w-full 
    border-slate-700 
    flex 
    items-center 
    justify-center 
    gap-2
    ${outline ? 'bg-white' : 'bg-slate-700'}
    ${outline ? 'text-slate-700 font-bold' : 'text-slate-200'}
    ${small ? 'text-sm font-medium' : 'text-md font-semibold'}
    ${small ? 'py-1 px-2  border-[1px]' : 'py-3 px-4 border-2'}
    `}>
      {icon && icon} {buttonText}
    </button>
    )
}

export default Button