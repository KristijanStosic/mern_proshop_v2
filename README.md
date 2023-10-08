# MERN-Ecommerce - ProShop v2

### Env Variables

Create a .env file in backend and add the following:

```
DATABASE_URI = your mongodb uri
PORT = 5000
NODE_ENV = development
JWT_SECRET = your secret key
JWT_LIFETIME = your jwt expiration 
```

### Install Dependencies (backend & frontend)

```
cd backend
npm install 
cd frontend:
npm install
```

### Run

```
# Run backend (:5000)
position in backend and than run next command: 
npm start

# Run frontend (:3000)
position in frontend and than run next command: 
npm start
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data. Position in backend and than run next commands:

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

email: admin@admin.com
password: 123456

email: john@gmail.com
password: 123456

email: jane@gmail.com
password: 123456

email: sheldon@gmail.com,
password: 123456

email: marry@gmail.com,
password: 123456

email: george@gmail.com,
password: 123456
```

