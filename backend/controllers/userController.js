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
    res.send('get users')
}

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
    res.send('get user by id')
}

// @desc Update user
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = async (req, res) => {
    res.send('update user by id')
}

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
    res.send('delete user')
}

export {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    updateUserProfile
}