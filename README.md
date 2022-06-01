# band_name_generator_api

## Project Description:

The goal of this project is to motivate the Codecademy community to learn and practice JavaScript. The app uses the following tech stack: 

- React
- Express
- PSQL
- Node.js

This is otherwise known as a PERN stack. At the time of writting this, the app currently concatenates an array of nouns and adjectives to "randomly" create a bandname. 
If the user doesn't like the presented bandname, they can make the app generate another. If by chance they do like the bandname, they can save the bandname into the PSGL db.
The app will also have the option to show a list of already-liked bandnames. These bandnames are upvoted and downvoted. In addition, when liking or disliking a bandname, you can
"spam" either one. 

## Contribution Guide:

First, thank you so much for taking the time to contribute and for sharing your knowledge. In order to contibute you'll need to do some setup work. This will be a list of steps to take:

 -You'll need to make sure you have PSQL installed on your computer. You can read more about that [here](https://www.postgresql.org/download/). 
Personally, I use the SQL shell script that comes with PSQL to query the DB.
- Once you have it installed, you'll have to create a database called `bandnameapi` This database will have a table called `bandnames` and `users`. Here is a picture of these 
tables and their columns: 

![image](https://user-images.githubusercontent.com/76107997/166914063-186f5bcd-ffe2-4a27-9e08-65831e9d4dc1.png)

- You will also need a `.env` file. This is *highly important* since your DB may require a password (keep in mind the project is setup so  that it expects a password). 
If you hard code this password, and then make contributions to the project, your password maybe published with the project. The project has a `env.example` folder in which
you can see how your `.env` file should be structured. 
- Finally, installing the node packages will be unorthodox for this project. `my-app` contains the React portion, which you will need to `cd` into before running `npm install`. 
The root direcotry also has the node modules for the express server. So you'll also have to run `npm install` in the root directory.
- Finally you can run `npm start` in `my-app` to spin up the front end, and `nodemon server.js` for the server. 

Keep in mind that your contribution could make this repository multi-faceted. As a result, it's highly recommended to add tests to your contribution. 
