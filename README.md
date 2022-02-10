# fusedeck-assessment

Dear candidate,

This repository is a suggested bootstrap application for the coding assessment at Capture Media AG. You can but don't have to use it. If you are more familiar with different backend or frontend frameworks or prefer a different database backend, you are free to adapt this base setup or create an entirely different one on your own. We want you to be as comfortable as possible during the assessment so you are free to use any stack or tools that you require in order to perform at your best. Keep in mind, our stack uses mainly TypeScript and PHP.

Please have the application ready to run at the start of the assessment. The application is a simple todo app with categories and todos. During the assessment you will build the frontend to display the data and extend the backend with additional features to achieve the acceptance criteria outlined below.

A developer will be joining you during the assessment. You will not be judged by how fast you are or how far you get with the implementation. We are more interested in how you approach problems and how you collaborate with other developers.

## Acceptance criteria
- A list of todo's with the category that belongs to that todo
- Show the name und the description of the todo's in the list
- I can check a todo as done
- I can check a todo as undone
- I can create a new todo for a category
- I can edit a todo and its category assignment
- I can delete a todo
- I can create a new category
- I can edit a category
- I can delete a category

## How to run this app
This application was tested on Mac and (Debian based) Linux. In case it doesn't run on your machine, get in touch with us as soon as possible and tell us your computer specs.

### On docker-compose
```sh
docker-compose up
```

### On node
```sh
yarn install
yarn start-dev
```

## Database schema
```
category                    todo
======                      ======
id(INT)PK                   id(INT)PK
name (VARCHAR)              category_id(INT)
                            title(VARCHAR)
                            description(VARCHAR)
                            done(BOOLEAN)
```

## Rules
- You are open how to solve it.
- We are open for your questions.
- The internet is open to use for everything.
- Do not implement any of the requested features in advance.
