const Input = ({ id, label, type, disabled, required, value, onChange, onPaste, placeholder }) => {
    return (
        <div className='w-full relative'>
            <input
                autoComplete="off"
                id={id}
                value={value}
                onChange={onChange}
                disabled={disabled}
                type={type}
                onPaste={onPaste}
                placeholder={placeholder}
                required={required}
                className={`
                peer 
                w-full 
                p-3 
                pt-6 
                text-slate-800
                outline-none 
                bg-white 
                font-light 
                border-2 
                rounded-md 
                transition 
                disabled:opacity-75 
                disabled:cursor-not-allowed
                `
                }
            />
            <label
                className={`
                    absolute 
                    cursor-text 
                    text-md 
                  text-slate-700
                    duration-150 
                    transform 
                    -translate-y-3 
                    top-5 
                    z-10 
                    origin-[0] 
                    left-4
                    peer-placeholder-shown:scale-100 
                    peer-placeholder-shown:translate-y-0 
                    peer-focus:scale-75 
                    peer-focus:-translate-y-4
                `
                }
                htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

export default Input