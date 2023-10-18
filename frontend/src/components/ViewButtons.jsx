import { FaList, FaTh } from 'react-icons/fa'

const ViewButtons = ({ view, setView }) => {
    const btnGrid = view === 'grid' ? 'bg-slate-700 p-[7px] rounded text-white hover:bg-slate-700' : 'bg-slate-50'
    const btnList = view === 'list' ? 'bg-slate-700 p-[7px] rounded text-white hover:text-white' : 'bg-slate-50'

    return (
    <div className='flex items-center gap-3'>
        <button 
            className={btnGrid} 
            type='button' 
            onClick={() => setView('grid')}
        >
            <FaTh />
        </button>
        <button 
            className={btnList} 
            type='button' 
            onClick={() => setView('list')} 
        >
            <FaList />
        </button>
    </div>
)
}

export default ViewButtons