# Full Stack Software Engineer Test

Total components - 4
 - Backend=Flask server
 - FrontEnd=React.js
 - Databses = Mongo Db && Postgresql in docker container

prerequiste 
 - Install Docker & docker-compose
 - Install pipenv from terminal
 - Install node (I am using node -v v10.15.0)




## Steps to follow:
1. Clone git repo locally 

### `git clone https://github.com/Huzi1/packform`

2. setting up database stack
- 2.1 go to dir `packform`
- 2.2 run the below cmd to start postgresql and mongoDB containers
    ###`docker-compose up -d `
    
Note:
- postgresql should listen at 0.0.0.0:5432 with default username=postgres and password=admin
- mongoDB should listen at 0.0.0.0:27017 
- mongodb can be accessed through browser at http://0.0.0.0:8081/ 


3. setting up application stack 
    backend: 
        3.1 - navigate to packform/backEnd 
        3.2 - install pipenv shell with requirements (run from backend dir)
            ```pipenv install -r app/requirements.txt```
        3.3 - activate shell by ``` pipenv shell ```
        3.4 - run flask from packfrom/backEnd/app ```python app.py```

        Your Flask App is now up and running. All flask api's are now exposed!
        Note* check terminal outputs for comments. Python script will execute sql script for schema building and populate the databases.
       
    frontEnd:
        3.1 - navigate to packform/front_end
        3.2 - Install node modules  ```npm install```
        3.3 - Build project ```npm run-script build```
        3.4 - After build, serve with port ```serve -s build -p 3000```

        Note* make sure port is 3000


#####Testing######

    backEnd: 
        - from packform/backEnd/app run ```python testApp.py```
        
    frontEnd:
        - from packform/front_end run ``` npm test```
        (if promted with no new change, enter to test all again )
        
