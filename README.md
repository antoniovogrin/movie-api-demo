## How to build 

1. Clone repository
2. Open a command prompt or any other terminal
3. Set the path to `[repository root]`
4. Run the command
    - `pnpm i` to install requrired dependecies
  
  > ⚠️ note: pnpm needs to be installed globaly on your pc (`npm install -g pnpm`)
> 
  > 💬 I prefer using pnpm but it can be used with `npm i` as well
      
5. Run the command: 
    -  `npm run build`
   

## How to run

1. Make sure that the build was successful
2. Open a command prompt or any other terminal
3. Set the path to `[repository root]`
4. Run the command
    - `npm run start` or `npm run dev` to start the app

> 💬 this will start your application in a local `node.js` server. You will be able to access your application at `http://localhost:8080`
>
> ⚠️ port can be changeed in .env file


## Mongo

1. Server use exisitng mongodb on mongo atlas
2. If you want to use other instance of mongodb feel free to change connection parameters in .env file

> ⚠️ on first start, if movie collection in db is empty, app will insert inital 100 movie records from json file.


## How to test via postman

1. In the repository you can find collection for postman `postman_collection.json`
2. Open postman app and import this collection
3. Make sure that server is up and running
4. Feel free to play around with prepared API endpoints
