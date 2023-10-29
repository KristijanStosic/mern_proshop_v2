import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCreateProductMutation } from "../../slices/productsApiSlice"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Container from "../../components/Container"
import FormContainer from "../../components/FormContainer"
import Input from "../../components/Input"
import Button from "../../components/Button"
import LoadingButton from "../../components/LoadingButton"
import TextArea from "../../components/TextArea"
import Select from "../../components/Select"

const ProductCreateScreen = () => {
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [model, setModel] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(1)
    const [countInStock, setCountInStock] = useState(1)

    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadStart, setUploadStart] = useState(false)

    const navigate = useNavigate()

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()

    const createProductHandler = async (e) => {
        e.preventDefault()

        const productData =
            { name, image, description, model, brand, category, price, countInStock }

        try {
            await createProduct(productData).unwrap()
            toast.success('Product created')
            navigate('/admin/all-products')
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    const uploadImageHandler = async (e) => {
        e.preventDefault()
        setUploadStart(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        try {
            if (!file) return toast.error('Please choose image')
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') return toast.error('File format is incorrect, please choose image')
            if (file.size > 2048 * 2048) return toast.error('Size to large')

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (event) => {
                    const progress = Math.round((event.loaded / event.total) * 100)
                    setUploadProgress(progress)
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            toast.success(data.message)
            setImage(data.image)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
            setUploadStart(false)
            setImage('')
        }
    }

    return (
        <>
            <Container>
                <form onSubmit={createProductHandler}>
                    <FormContainer>
                        <h1 className='text-slate-700 text-3xl font-semibold'>
                            CREATE NEW PRODUCT
                        </h1>

                        <Input
                            id='name'
                            label='Name'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            disabled={loadingCreate}
                        />

                        <Input
                            id='model'
                            label='Model'
                            onChange={(e) => setModel(e.target.value)}
                            value={model}
                            required
                            disabled={loadingCreate}
                        />

                        <Input
                            id='price'
                            label='Price'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            type='number'
                            required
                            disabled={loadingCreate}
                        />

                        <Input
                            id='countInStock'
                            label='Stock'
                            onChange={(e) => setCountInStock(e.target.value)}
                            value={countInStock}
                            type='number'
                            required
                            disabled={loadingCreate}
                        />

                        <TextArea
                            id='description'
                            label='Description'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            type='text'
                            required
                            disabled={loadingCreate}
                        />

                        <Select
                            id='brand'
                            label='Brand'
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                            type='brand'
                            required
                            disabled={loadingCreate}
                        />

                        <Select
                            id='category'
                            label='Category'
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            type='category'
                            required
                            disabled={loadingCreate}
                        />

                        <input
                            onChange={uploadImageHandler}
                            type="file"
                            className="
                                    cursor-pointer 
                                    hover:cursor-pointer
                                    text-sm 
                                    text-slate-700
                                    file:mr-4 
                                    file:py-2 
                                    file:px-4 
                                    file:rounded-md
                                    file:border-0 
                                    file:text-md 
                                    file:font-medium
                                  file:bg-slate-50 
                                  file:text-slate-800
                                  hover:file:bg-slate-300
                                "
                        />

                        {uploadStart && (
                            <div className="w-full bg-gray-200 rounded-full">
                                <div
                                    className="
                                  bg-blue-600 
                                    text-xs 
                                    font-medium 
                                  text-blue-100 
                                    text-center 
                                    p-2 
                                    leading-none 
                                    rounded-full"
                                    style={{ width: `${uploadProgress}%` }}
                                >
                                    {uploadProgress}%
                                </div>
                            </div>
                        )}

                        <Button
                            type='submit'
                            disabled={loadingCreate}
                            buttonText={loadingCreate ? <LoadingButton /> : 'Submit'}
                        />
                    </FormContainer>
                </form>
            </Container>
        </>
    )
}

export default ProductCreateScreen