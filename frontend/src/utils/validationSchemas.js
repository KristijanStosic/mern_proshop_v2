import * as yup from 'yup'

const registerSchema = yup.object().shape({
    name: yup.string().min(3, 'Name is to short').required('Name is required field'),
    email: yup.string().email('Enter valid email').required('Email is required field'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required field'),
    confirmPassword: yup.string()
        .required("Confirm Password is required field")
        .oneOf([yup.ref("password")], "Passwords do not match"),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
})

const loginSchema = yup.object().shape({
    email: yup.string().email('Enter valid email').required('Email is required field'),
    password: yup.string().required('Password is required field'),
})

const createProductSchema = yup.object().shape({
    name: yup.string().min(3, 'Name is to short').required('Name is required field'),
    image: yup.mixed().required('Image is required').test('fileFormat', 'Unsupported Format', (value) => {
        return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
    }).test('fileSize', 'File too large', (value) => {
        return value && value.size <= 1024 * 1024; // 1 MB
    }),
    description: yup.string().required('Description is required field'),
    brand: yup.string().required('Brand is required field'),
    category: yup.string().required('Category is required field'),
    price: yup.number().min(1).required('Price is required field'),
    countInStock: yup.number().min(1, 'Count in stock must be greater than or equal to 1').required('Count in stock is required field'),
})

export { registerSchema, loginSchema, createProductSchema }