import bcrypt from 'bcryptjs'

const comparePassword = async (enteredPassword, existingPassword) => {
    return await bcrypt.compare(enteredPassword, existingPassword)
}

export { comparePassword } // named import/export