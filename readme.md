## SETUP NODE_MODULES npm packages used:
0. **Initialize npm:**
   ```sh
   npm init

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Install nodemon for automatic server restarts during development:**
   ```sh
   npm install nodemon --save-dev
   ```

3. **Install necessary packages for authentication and database:**
   ```sh
   npm install bcrypt jsonwebtoken mongoose body-parser express
   ```
## SETUP NODE_MODULES npm packages MONGOOSE:
1. **Install mongosee**
    ```sh
    npm i mongoose
    ```
## ENV
1. **Install package**
    ```sh
    npm install dotenv
    ```
2. **Using**
    ```sh
    const dotenv = require('dotenv');
    ```
     ```sh
    Create info.env
    MONGO_USERNAME=<username>
    MONGO_PASSWORD=<password>
    MONGO_CLUSTER=<link>
    MONGO_DB=<db>
    ```