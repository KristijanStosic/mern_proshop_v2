const Select = ({ id, label, disabled, required, value, onChange, type }) => {
    return (
        <div className='w-full relative'>
            <select
                id={id}
                label={label}
                onChange={onChange}
                value={value}
                disabled={disabled}
                required={required}
                className=" 
                w-full 
                p-3 
                text-slate-800
                outline-none 
                bg-white 
                font-light 
                border-2 
                rounded-md 
                disabled:opacity-75 
                disabled:cursor-not-allowed">
                {type === 'brand' && (
                    <>
                        <option defaultValue="">Select brand</option>
                        <option value="Apple">Apple</option>
                        <option value="Cannon">Cannon</option>
                        <option value="Sony">Sony</option>
                        <option value="Amazon">Amazon</option>
                        <option value="Logitech">Logitech</option>
                        <option value="Samsung">Samsung</option>
                    </>
                )}

                {type === 'category' && (
                    <>
                        <option defaultValue="">Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="Gaming/Console">Gaming/Console</option>
                        <option value="Phones">Phones</option>
                        <option value="Electronics">Electronics</option>
                    </>
                )}

                {type === 'gender' && (
                    <>
                        <option defaultValue="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </>
                )}
            </select>
        </div>
    )
}

export default Select