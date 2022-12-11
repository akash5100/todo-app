# Todo App

This is a simple todo app built with React, Node.js, Express and Sqlite3. This project demonstrates connecting a React frontend to a Node.js backend.

## Build the project


### Build project manually

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


##Or
### Build project with npm (I faced bugs with this method)

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

- cd into the server folder

```bash
cd /server
```

- Run the server

```bash
npm run build
npm start
```

- Get the ip address of the container

```bash
docker inspect <container_id> | grep "IPAddress"
```

- Open the browser and go to the ip address of the container

```bash
http://<ip_address>:3000
```
 


