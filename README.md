# SFL-activity-system
An activity system for Star for Life in South Africa.

How to get it started
- Install node.js
- To install all dependencies move to activity_system/ and run: `npm install`
- Install bower by running: `npm install -g bower`
- To install angular dependencies move to activity_system/public/ and run `bower install`
- Install Mysql
-- Either set the password of your mysql root account to 'mysql' or change the password field in activity_system/app.js on row 32 to your password.
-- This password thing will be different in future development
- Create a database and run database/database-setup.sql to create all tables
-- Either call your database activity_system or change the database field in activity_system/app.js on row 33 to your database name.
-- This will also change in future development
-- How to run a sql-file depends on how you are running Mysql (command line, some gui..), google how to do it
- Run database-values.sql to fill the database with data

Start the server by navigating to activity_system/ and running `npm start`

The server should start running on port 3000, open your browser and navigate to localhost:3000 to view it