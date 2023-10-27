import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useGetProfileQuery, useUpdateProfileMutation } from "../slices/usersApiSlice"
import { toast } from 'react-hot-toast'
import { setCredentials } from "../slices/authSlice"
import axios from 'axios'
import Container from "../components/Container"
import Input from "../components/Input"
import Button from "../components/Button"
import FormContainer from "../components/FormContainer"
import TextArea from "../components/TextArea"
import PasswordInput from "../components/PasswordInput"
import Select from "../components/Select"
import Loader from "../components/Loader"
import Avatar from "../components/Avatar"
import LoadingButton from "../components/LoadingButton"

const ProfileScreen = () => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [biography, setBiography] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')

    const [uploadProgress, setUploadProgress] = useState(0)
    const [uploadStart, setUploadStart] = useState(false)

    const { data, isLoading, error, refetch } = useGetProfileQuery()

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation()

    const updateProfileHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await updateProfile({
                    name,
                    email,
                    password,
                    dateOfBirth,
                    gender,
                    biography,
                    image,
                    phone
                }).unwrap()
                dispatch(setCredentials({ ...res }))
                toast.success('Profile updated successfully')
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
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
        if (data) {
            refetch()
            setName(data.name)
            setEmail(data.email)
            setDateOfBirth(data.dateOfBirth)
            setGender(data.gender)
            setBiography(data.biography)
            setImage(data.image)
            setPhone(data.phone)
        }
    }, [data])

    return (
        <>
            <Container>
                <form onSubmit={updateProfileHandler}>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <FormContainer>
                            <h1 className='text-slate-700 text-3xl font-semibold'>
                                MY PROFILE
                            </h1>

                            <Input
                                id='name'
                                label='Name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                disabled={loadingUpdateProfile}
                            />

                            <Input
                                id='email'
                                label='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                disabled={loadingUpdateProfile}
                            />

                            <PasswordInput
                                id='password'
                                label='New Password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                disabled={loadingUpdateProfile}
                            />

                            <PasswordInput
                                id='confirmPassword'
                                label='Confirm New Password'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                disabled={loadingUpdateProfile}
                            />

                            <Input
                                id='dateOfBirth'
                                label='Date of Birth'
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                value={dateOfBirth}
                                type='date'
                                disabled={loadingUpdateProfile}
                            />

                            <Input
                                id='phone'
                                label='Phone'
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                type='text'
                                disabled={loadingUpdateProfile}
                            />

                            <Select
                                id='gender'
                                label='Gender'
                                onChange={(e) => setGender(e.target.value)}
                                value={gender}
                                type='gender'
                                required
                                disabled={loadingUpdateProfile}
                            />

                            <TextArea
                                id='biography'
                                label='Biography'
                                onChange={(e) => setBiography(e.target.value)}
                                value={biography}
                                type='text'
                                disabled={loadingUpdateProfile}
                            />

                            <Avatar type='profile' src={data.image} />

                            <Input
                                id='image'
                                label='Image'
                                onChange={uploadImageHandler}
                                type='file'
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
                                disabled={loadingUpdateProfile}
                                buttonText={loadingUpdateProfile ? <LoadingButton /> : 'Submit'}
                            />
                        </FormContainer>

                    )}
                </form>
            </Container>
        </>
    )
}

export default ProfileScreen