# Shoelace Learning

- Installing and running

* ```npm run setup```
* ```npm run dev```

- Open http://localhost:8081

* You can register users on the Register page

* To add schools, please make a POST call on POSTMAN or your favorite tool to
http://localhost:8080/api/schools

* The format is: (You have to open mongodb after registering the users, and get the user id there)
{
    "name": "School X",
    "address": "Testing address",
    "user": "622f466b6a1a4e5ffae82a82"
}

* This was done because I assumed that the application would show and edit an already done list of schools. However, the application also supports moderator and admin role for users, and for a future improvement it could be created a page to add schools, and select users that are on that school (It would probably mean a change on the school model to support multiple users).