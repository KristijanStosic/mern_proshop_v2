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
import Message from "../components/Message"
import ProfileInput from "../components/ProfileInput"
import ProfileTextArea from "../components/ProfileTextArea"

const ProfileScreen = () => {
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')
    const [biography, setBiography] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')

    const { data, isLoading, error, refetch } = useGetProfileQuery()

    const [updateProfile, { isLoading: loadingUpdateProfile }] = useUpdateProfileMutation()

    const updateProfileHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            const userData = { name, email, password, gender, biography, image, phone }
            try {
                const res = await updateProfile(userData).unwrap()
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
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            toast.success(data.message)
            setImage(data.image)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
            setImage('')
        }
    }

    useEffect(() => {
        if (data) {
            refetch()
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setEmail(data.email)
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
                    ) : error ? (
                        <Message>{error?.data?.message || error.error}</Message>
                    ) : (
                        <FormContainer>

                            <h1 className='text-slate-700 text-3xl font-semibold'>
                                MY PROFILE
                            </h1>

                            <ProfileInput 
                                id='firstName'
                                value={firstName}
                                type='text'
                                placeholder='Write your first name here'
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={loadingUpdateProfile}
                            />

                            <ProfileInput 
                                id='lastName'
                                value={lastName}
                                type='text'
                                placeholder='Write your last name here'
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={loadingUpdateProfile}
                            />

                            <ProfileInput
                                id='email'
                                value={email}
                                type='text'
                                placeholder='Write your email here'
                                onChange={(e) => setEmail(e.target.value)}
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

                            <ProfileInput
                                id='phone'
                                value={phone}
                                placeholder='Write your phone number here'
                                onChange={(e) => setPhone(e.target.value)}
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

                            <ProfileTextArea
                                id='biography'
                                label='Biography'
                                placeholder='Write your biography here'
                                onChange={(e) => setBiography(e.target.value)}
                                value={biography}
                                type='text'
                                disabled={loadingUpdateProfile}
                            />

                            <Avatar type='profile' src={data.image} />

                            <label htmlFor="image" className="text-sm text-slate-700 font-semibold">Image</label>
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