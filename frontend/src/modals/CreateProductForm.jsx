import { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const CreateProductForm = ({ closeDialog }) => {
    const [imageUploading, setImageUploading] = useState(false)

    const handleCreateProductSubmitForm = async (values) => {
        handleImageUpload(values)
        closeDialog()
    }

    const handleImageUpload = async (values) => {
        const formData = new FormData()
        formData.append('image', values.image)
        setImageUploading(true)
        try {
            const response = await axios.post('/api/upload', formData)

            if (response.data.success) {
                values.image = response.data.image
                toast.success(response.data.message)
                setImageUploading(false)
            } else {
                setImageUploading(false)
                toast.error('Uploading error')
            }
        } catch (error) {
            setImageUploading(false)
            toast.error(error.message)
        }
    }

    return (
        <>

                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className='my-2' controlId="validationFormik01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                                isValid={touched.name && !errors.name}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback />
                        </Form.Group>

                        <Form.Group className='my-2' controlId="validationFormik02">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={(e) =>
                                    setFieldValue('image', e.target.files[0])
                                }
                                isInvalid={!!errors.image}
                                isValid={touched.image && !errors.image}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.image}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback />
                        </Form.Group>

                        <Form.Group className='my-2' controlId="validationFormik03">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                isInvalid={!!errors.description}
                                isValid={touched.description && !errors.description}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback />
                        </Form.Group>

                        <Form.Group className='my-2' controlId="validationFormik04">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Brand"
                                name="brand"
                                value={values.brand}
                                onChange={handleChange}
                                isInvalid={!!errors.brand}
                                isValid={touched.brand && !errors.brand}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.brand}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback />
                        </Form.Group>

                        <Form.Group className='my-2' controlId="validationFormik05">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Category"
                                name="category"
                                value={values.category}
                                onChange={handleChange}
                                isInvalid={!!errors.category}
                                isValid={touched.category && !errors.category}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                            <Form.Control.Feedback />
                        </Form.Group>

                        <Form.Group className='my-2' controlId="validationFormik06">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Count in stock"
                                name="countInStock"
                                value={values.countInStock}
                                onChange={handleChange}
                                isInvalid={!!errors.countInStock}
                                isValid={touched.countInStock && !errors.countInStock}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.countInStock}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='my-2' controlId="validationFormik07">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price"
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                isInvalid={!!errors.price}
                                isValid={touched.price && !errors.price}
                            />

                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-1">
                            <Button type="submit">Create</Button>
                            <Button type='button' onClick={closeDialog}>Cancel</Button>
                        </div>

                    </Form>

        </>
    )
}

export default CreateProductForm