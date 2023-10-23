const FormContainer = ({ children }) => {
    return ( 
        <div className="
        min-h-fit 
        h-full 
        flex 
        items-center 
        justify-center 
        pb-12 
        pt-12"
        >
            <div className="
                max-w-[550px] 
                w-full 
              bg-slate-200 
                items-center 
                flex 
                flex-col 
                gap-3
                shadow-xl 
              shadow-slate-300 
                rounded-md 
                p-4 
                md:px-8
            "
            >
                {children}
            </div>
        </div>
     )
}
 
export default FormContainer