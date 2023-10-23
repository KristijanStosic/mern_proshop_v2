import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import CreateProductForm from './CreateProductForm'
import { FaTimes } from 'react-icons/fa'

const CreateProductModal = ({ closeCreateModal }) => {

  return (
    <>
      <div className='sticky top-0 right-0 z-30 left-0 flex justify-center items-center'>
        {/* Main modal */}
        <div className="w-full max-w-3xl">

          {/* Modal content */}
          <div className="bg-white p-5">
            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-2xl font-semibold text-slate-700">
                Add Product
              </h3>

              <button type="button" className="text-slate-700 hover:text-rose-500 rounded-lg text-sm p-1.5" onClick={closeCreateModal}>
                <FaTimes size={24} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CreateProductModal