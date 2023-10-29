import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useGetProductByIdQuery, useUpdateProductMutation } from "../../slices/productsApiSlice"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import Container from "../../components/Container"
import FormContainer from "../../components/FormContainer"
import Input from "../../components/Input"
import Button from "../../components/Button"
import LoadingButton from "../../components/LoadingButton"
import TextArea from "../../components/TextArea"
import Select from "../../components/Select"
import Loader from "../../components/Loader"

const ProductUpdateScreen = () => {
    const { productId } = useParams()

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

    const { data: product, isLoading, refetch, error } =
        useGetProductByIdQuery(productId)

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()

    const updateProductHandler = async (e) => {
        e.preventDefault()

        const productData =
            { productId, name, image, description, model, brand, category, price, countInStock }

        try {
            await updateProduct(productData).unwrap()
            toast.success('Product updated')
            refetch()
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

    useEffect(() => {
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setModel(product.model)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }
    }, [product])

    return (
        <>
            <Container>
                <form onSubmit={updateProductHandler}>
                    <FormContainer>
                        <h1 className='text-slate-700 text-3xl font-semibold'>
                            UPDATE PRODUCT
                        </h1>

                        {loadingUpdate && <Loader />}

                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <Message>{error?.data?.message || error.error}</Message>
                        ) : (
                            <>

                                <Input
                                    id='name'
                                    label='Name'
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    disabled={loadingUpdate}
                                />

                                <Input
                                    id='model'
                                    label='Model'
                                    onChange={(e) => setModel(e.target.value)}
                                    value={model}
                                    disabled={loadingUpdate}
                                />

                                <Input
                                    id='price'
                                    label='Price'
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    type='number'
                                    disabled={loadingUpdate}
                                />

                                <Input
                                    id='countInStock'
                                    label='Stock'
                                    onChange={(e) => setCountInStock(e.target.value)}
                                    value={countInStock}
                                    type='number'
                                    disabled={loadingUpdate}
                                />

                                <TextArea
                                    id='description'
                                    label='Description'
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                    type='text'
                                    disabled={loadingUpdate}
                                />

                                <Select
                                    id='brand'
                                    label='Brand'
                                    onChange={(e) => setBrand(e.target.value)}
                                    value={brand}
                                    type='brand'
                                    disabled={loadingUpdate}
                                />

                                <Select
                                    id='category'
                                    label='Category'
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                    type='category'
                                    disabled={loadingUpdate}
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
                                    disabled={loadingUpdate}
                                    buttonText={loadingUpdate ? <LoadingButton /> : 'Submit'}
                                />
                            </>
                        )}

                    </FormContainer>
                </form>
            </Container>
        </>
    )
}

export default ProductUpdateScreen