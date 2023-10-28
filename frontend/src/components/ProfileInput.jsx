const ProfileInput = ({ id, value, onChange, disabled, type, placeholder, }) => {
    return (

        <div className="w-full">
            <input
                autoComplete="off"
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                className={`
                  placeholder:text-slate-900
                    w-full 
                    p-3 
                    outline-none 
                  bg-white 
                    font-light 
                    border-2 
                    rounded-md 
                    disabled:opacity-75 
                    disabled:cursor-not-allowed
                `}
            />
        </div>
    )
}

export default ProfileInput