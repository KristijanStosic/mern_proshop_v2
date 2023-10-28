import User from "../models/userModel.js"

// @desc Get user profile
// @route POST /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        biography: user.biography,
        image: user.image,
        phone: user.phone
    })
}

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
    const { name, email, password, dateOfBirth, gender, biography, image, phone } = req.body

    const user = await User.findById(req.user._id)

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.dateOfBirth = dateOfBirth || user.dateOfBirth
        user.gender = gender || user.gender
        user.biography = biography || user.biography
        user.image = image || user.image
        user.phone = phone || user.phone

        if (password) {
            user.password = password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            dateOfBirth: updatedUser.dateOfBirth,
            gender: updatedUser.gender,
            biography: updatedUser.biography,
            image: updatedUser.image,
            phone: updatedUser.phone
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
}

// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.page) || 1
    const limit = pageSize
    const skip = (page - 1) * pageSize

    const searchCriteria = {}

    if (req.query.keyword) {
        searchCriteria.$or = [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { email: { $regex: req.query.keyword, $options: 'i' } },
        ]
    }

    const count = await User.countDocuments({ ...searchCriteria })
    const users = await User.find({ ...searchCriteria })
        .limit(limit)
        .skip(skip)

    if (!users?.length) {
        res.status(404)
        throw new Error('Users not found!')
    }

    res.status(200).json({ users, page, pages: Math.ceil(count / pageSize) })
}

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
    const user = await User.findbyId(req.params.id).select('-password')

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json(user)
}

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = async (req, res) => {
    const { name, email, isAdmin } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    user.name = name || user.name 
    user.email = email || user.email 
    user.isAdmin = Boolean(isAdmin)

    const updatedUser = await user.save() 

    res.status(200).json(updatedUser)
}

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
    const user = await User.findbyId(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    if (user.isAdmin) {
        res.status(409)
        throw new Error('Admin cannot be deleted')
    }

    await User.deleteOne({ _id: user._id })

    res.status(200).json({ message: 'User deleted' })
}

export {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile
}