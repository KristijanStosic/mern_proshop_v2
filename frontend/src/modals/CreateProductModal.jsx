import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaPlus, FaTimes } from 'react-icons/fa'
import Input from '../components/Input'
import Button from '../components/Button'

const CreateProductModal = ({ closeCreateModal }) => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [model, setModel] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState(1)
  const [countInStock, setCountInStock] = useState(1)

  return (
    <>
      <div className='fixed top-4 right-0 left-0 z-50 flex justify-center items-center'>
        {/* Main modal */}
        <div className="w-full max-w-2xl h-full md:h-auto  overflow-hidden">

          {/* Modal content */}
          <div className="relative z-50 p-4 bg-white rounded-lg shadow ">

            {/* Modal header */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
              <h3 className="text-2xl font-semibold text-slate-700">
                Add Product
              </h3>
              <button type="button" className="text-slate-700 hover:text-rose-500 rounded-lg text-sm p-1.5" onClick={closeCreateModal}>
                <FaTimes size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form>
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <Input
                    id='name'
                    label='Name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    //disabled={isLoading}
                    required
                  />
                </div>

                <div>
                  <Input
                    id='price'
                    label='Price'
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <select id="brand" label='brand' onChange={(e) => setBrand(e.target.value)} value={brand} className="pt-3 bg-gray-50 border-2 text-md border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-3">
                    <option defaultValue="">Select brand</option>
                    <option value="Apple">Apple</option>
                    <option value="Cannon">Cannon</option>
                    <option value="Sony">Sony</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Logitech">Logitech</option>
                    <option value="Samsung">Samsung</option>
                  </select>
                </div>

                <div>
                  <select id="category" label='category' onChange={(e) => setCategory(e.target.value)} value={category} className="bg-gray-50 border-2 pt-3 text-md border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 w-full p-3">
                    <option defaultValue="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                  </select>
                </div>

                <div>
                  <Input
                    id='model'
                    label='Model'
                    type='text'
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Input
                    id='countInStock'
                    label='Stock'
                    type='number'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <textarea
                    id="description"
                    label='description'
                    type='text'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    rows="4"
                    placeholder="Write product description here"
                    className="block p-3 w-full text-md text-slate-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500">
                  </textarea>
                </div>

                <div className='col-span-1'>
                  <div className="relative rounded-lg border-dashed border-2 border-gray-300 p-3 bg-gray-500">
                    <input className="opacity-0 absolute top-0 left-0 cursor-pointer w-full" id="image" type="file" accept='image/*' />
                    <p className="mt-1 text-sm text-slate-50" id="image">JPEG, PNG or JPG (MAX. 1MB).</p>
                  </div>
                </div>

                <div></div>
                
                <div className='col-span-1'>
                  <Button type="submit" buttonText='Add new product' icon={<FaPlus />} />
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateProductModal