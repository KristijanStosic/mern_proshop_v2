import { ClockLoader } from 'react-spinners'

const override = {
  display: "block",
}

const Loader = () => {
  return (
    <div className='flex items-center justify-center mt-32'>
      <ClockLoader 
        aria-label="Loading Spinner"
        data-testid="loader" 
        cssOverride={override} 
        size={100} 
        color="#334155" 
      />
    </div>
  )
}

export default Loader