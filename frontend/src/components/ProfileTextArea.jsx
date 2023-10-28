const ProfileTextArea = ({ id, type, disabled, placeholder, required, value, onChange }) => {
    return (
        <div className='w-full relative'>
            <textarea
                autoComplete="off"
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                rows='4'
                required={required}
                className={`
                    w-full 
                    p-3 
                  placeholder:text-slate-800
                  text-slate-700
                  bg-white 
                    outline-none 
                    font-light 
                    border-2 
                    rounded-md 
                    disabled:opacity-75 
                    disabled:cursor-not-allowed
                `
                }
            />
        </div>
    )
}

export default ProfileTextArea