# CS336-Sample-Application
A sample application to show use of Polymer. 

## DB - MySQL

This code assumes that there is a MYSQL DB running. The details of this DB instane can be specified in the server.js file in the root directory of the project. You can use even an RDS instance of MySQL.

## Application Layer

The code has been written for NodeJS v6.12.0
It uses express framework along with sequelize to connect to MySQL database.

You can find details of different libraries used in NodeJS

* [Express](https://expressjs.com/)
* [Sequelize](http://docs.sequelizejs.com/)

### Disclaimer
You'll have to use a Non-ORM library for your projects.

## Front-end 
Used [Polymer](https://www.polymer-project.org/2.0/start/) for UI, which is based on a methodology of web elements.

You can find details of the elements used in the Polymer at

* [Vaadin Grid](https://vaadin.com/elements/vaadin-grid/html-examples/grid-basic-demos)
* [Default Polymer Elements](https://www.webcomponents.org/collection/Polymer/elements)

## How to run this code

### Install git

Follow the [guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for installing git

### Install Nodejs and npm
Follow the [guide](https://nodejs.org/en/download/package-manager/) for installing nodejs

### Install bower
`npm install -g bower`

### Install polymer-cli
Follow the [guide](https://www.polymer-project.org/2.0/docs/tools/polymer-cli) to install polymer cli

### Clone the project
`git clone https://github.com/TheSPD/CS336-Sample-Application.git`

### Install dependencies 
Go to project root directory
`cd <project-dir>`
Install dependencies in the package.json
`npm install`
Go to UI directory
`cd app`
Install Polymer dependencies
`bower install`

### Change database config
In server.js, you'll find the connection to MySQL DB instance. Change the details here to a working database instance. Your RDS details will also work.

### Run server
You can run the code by using the command
`npm start`

Now you should be able to run the app on `localhost:5000`
