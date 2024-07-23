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
    Created file .env
    MONGO_USERNAME=<username>
    MONGO_PASSWORD=<password>
    MONGO_CLUSTER=<link>
    MONGO_DB=<db>
    ```
## API QUERY:
1. **Base**
   ```sh
    http://<ipaddress>:<port>/
    ```
1. **Link query**
   ```sh
   API USER:
   - Registration api/users/registration
   - Login  api/users/login
   - Get    api/users/user
   - Get    api/users/user/:id
   - Put    api/users/:id
   - Del    api/users/:id

   API USER SPECIALTY: 
   - Get    api/userSpecialty/
   - Get    api/userSpecialty/:id
   - Post   api/userSpecialty/
   - Put    api/userSpecialty/:id
   - Del    api/userSpecialty/:id

   API CATEGORY:
   - Get    api/coursesCategory/
   - Post   api/coursesCategory/
   - Put    api/coursesCategory/:id
   - Del    api/coursesCategory/:id

   API COURSES:
   - Get    api/courses/
   - Get    api/courses/paginated?page=?
   - Get    api/courses/getAllCourses  (full courses)
   - Get    api/courses/getListCourses (full information list)
   - Get    api/courses/:id
   - Get    api/courses/user/:id
   - Get    api/courses/category/:id
   - Post   api/courses/
   - Put    api/courses/:id
   - Del    api/courses/:id

   API EPISODE: 
   - Get    api/episodes/
   - Get    api/episodes/:id
   - Post   api/episodes/
   - Put    api/episodes/:id
   - Del    api/episodes/:id

   API FAVORITECOURSES: 
   - Get    api/fav/             (all favorites)
   - Get    api/fav/:id
   - Get    api/fav/user/:id     (all favorites for the user)
   - Get    api/fav/course/:id   (all favorites for the course)
   - Post   api/fav/
   - Put    api/fav/:id
   - Del    api/fav/:id

   API RATING: 
   - Get    api/rate/            (all ratings)
   - Get    api/rate/:id
   - Get    api/rate/user/:id    (all ratings for the user)
   - Get    api/rate/course/:id  (all ratings for the course)
   - Post   api/rate/
   - Put    api/rate/:id
   - Del    api/rate/:id

   API SEARCH:
   - Get    api/search?query=?
   - Get    api/search/courses?query=?
   - Get    api/search/users?query=?

   API COMMENT: 
   - Get    api/comment/ 
   - Get    api/comment/:id
   - Get    api/comment/user/:id 
   - Get    api/comment/episode/:id
   - Post   api/comment/
   - Put    api/comment/:id
   - Del    api/comment/:id
    ```    