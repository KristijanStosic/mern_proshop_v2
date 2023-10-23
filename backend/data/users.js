import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    createdAt: '01-01-2023'
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-02-2023'
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-03-2023'
  },
  {
    name: 'Sheldon Cooper',
    email: 'sheldon@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-04-2023'
  },
  {
    name: 'Marry Cooper',
    email: 'marry@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-05-2023'
  },
  {
    name: 'Missy Cooper',
    email: 'missy@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-06-2023'
  },
  {
    name: 'George Cooper',
    email: 'george@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-07-2023'
  },
  {
    name: 'George Jr Cooper',
    email: 'georgejr@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-08-2023'
  },
]

export default users