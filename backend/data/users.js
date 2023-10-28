import bcrypt from 'bcryptjs'

const users = [
  {
    _id: '653d634d09a50a038fc3d931',
    name: 'Admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    createdAt: '01-01-2023'
  },
  {
    _id: '653d643ae3505dc60121e0ef',
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-02-2023'
  },
  {
    _id: '653d64410bb66dba5ae1151e',
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-03-2023'
  },
  {
    _id: '653d644bb99792647c948cb4',
    name: 'Sheldon Cooper',
    email: 'sheldon@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-04-2023'
  },
  {
    _id: '653d645406e2c1be5d089e56',
    name: 'Marry Cooper',
    email: 'marry@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-05-2023'
  },
  {
    _id: '653d765a6b69dae9bc9ae687',
    name: 'Missy Cooper',
    email: 'missy@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-06-2023'
  },
  {
    _id: '653d64674a5e56ad99cdf948',
    name: 'George Cooper',
    email: 'george@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-07-2023'
  },
  {
    _id: '653d6471a2b580988d43ed05',
    name: 'George Jr Cooper',
    email: 'georgejr@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-08-2023'
  },
]

export default users