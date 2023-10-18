import { ClockLoader } from 'react-spinners'

const override = {
  display: "block",
  margin: "0 auto",
}

const Loader = () => {
  return (
    <div className='flex items-center justify-center mt-16'>
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