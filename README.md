# Todo App

This is a simple todo app built with React, Node.js, Express and Sqlite3. This project demonstrates connecting a React frontend to a Node.js backend.

![Screenshot from 2022-12-11 18-35-51](https://user-images.githubusercontent.com/53405133/206905380-130b782f-cd37-4041-b6d4-ad854b96761a.png)


## Build the project


### 1. Build project manually

- Install dependencies and build the project

```bash
cd server && npm install
```
```bash
npm run build
```
```bash
cd ../client && npm install
```
```bash
npm run build
```
- Run
```bash
    cd server && npm start
```
```bash
    cd client && npm start
```


## Or
### 2. Build project with npm (I faced bugs with this method)

```bash
cd server && npm install && cd ../client && npm install && cd ..
```
- Build the project
    
```bash 
npm run build
```

- Run the project

```bash
npm run start
```

## Run the Dockerfile

- Build the image

```bash
docker build -t todo-app .
```

- Run the container

```bash
docker run -p 5000:5000 -p 3000:3000 -d todo-app
```

This will start the container in the background.

- Get inside the container terminal

```bash
docker exec -it <container_id> bash
```
*You can get `container_id` with **docker ps** in terminal.*

- cd into the server folder

```bash
cd /server
```

- Run the server

```bash
npm run build
npm start
```

- The app will start in your http://localhost:3000
