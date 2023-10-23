import { ClipLoader } from 'react-spinners'

const override = {
    display: "block",
}

const LoadingButton = () => {
    return (
        <div className='flex items-center gap-2'>
            <ClipLoader
                aria-label="Loading Button Spinner"
                data-testid="loader"
                cssOverride={override}
                size={24}
                color="#f1f5f9"
            />
            <span>Loading...</span>
        </div>
    )
}

export default LoadingButton