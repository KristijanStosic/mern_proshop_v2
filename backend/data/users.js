import bcrypt from 'bcryptjs'

const users = [
  {
    _id: '653d634d09a50a038fc3d931',
    firstName: 'Admin',
    lastName: 'Kristijan',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    createdAt: '01-01-2023'
  },
  {
    _id: '653d643ae3505dc60121e0ef',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-02-2023'
  },
  {
    _id: '653d64410bb66dba5ae1151e',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-03-2023'
  },
  {
    _id: '653d644bb99792647c948cb4',
    firstName: 'Sheldon',
    lastName: 'Cooper',
    email: 'sheldon@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-04-2023'
  },
  {
    _id: '653d645406e2c1be5d089e56',
    firstName: 'Marry',
    lastName: 'Cooper',
    email: 'marry@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-05-2023'
  },
  {
    _id: '653d765a6b69dae9bc9ae687',
    firstName: 'Missy',
    lastName: 'Cooper',
    email: 'missy@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-06-2023'
  },
  {
    _id: '653d64674a5e56ad99cdf948',
    firstName: 'George',
    lastName: 'Cooper',
    email: 'george@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-07-2023'
  },
  {
    _id: '653d6471a2b580988d43ed05',
    firstName: 'George Jr',
    lastName: 'Cooper',
    email: 'georgejr@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    createdAt: '01-08-2023'
  },
]

export default users