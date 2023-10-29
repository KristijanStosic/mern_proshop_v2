const TextArea = ({ id, label, type, disabled, placeholder, required, value, onChange, page }) => {
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
                peer 
                w-full 
                p-3 
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
                    ${page === 'profile' || 'product'
                    ? 'absolute left-4 text-slate-800 text-sm top-0' 
                    : 'absolute cursor-text text-mdtext-slate-700  duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-4'}
                    
                `
                }
                htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

export default TextArea