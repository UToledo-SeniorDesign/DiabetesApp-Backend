# Diabetes-App Backend
Welcome to the backend of the Diabetes App! The backend utilizes [NodeJS](https://nodejs.org/en/) for the server, and [npm](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/) as package handler.
Please make sure to go over the [*Getting Started*](#Getting-Started) documentation in order to run this project.

## Table of Contents
1. [Getting Started](#Getting-Started)
2. [References](#References)

## Getting Started
To start you'll need to make sure to have Node and npm installed in your computer.

### Install Node & npm
Node comes with npm, so this means you will only need to install Node in your computer to obtain both. You can download Node in their official website, [here](https://nodejs.org/en/).
To check if node and npm are installed in your computer run the following command in your terminal window.
``` 
node --version && npm --version 
```
### Install packages
Now that you have npm we need to install the dependency, or packages, that are needed for this nodeJS project, this can be easily done by just running the following command:
```
npm install
```
This might take a couple of minutes, but let it finish in order to install everything.
### Environment Variables
Now that you have Node and all the required packages we need to setup our environmental variables. For this I created a basic file in this directory called ```.sample.env```

Start by renaming the ```.sample.env ``` to only ```.env```, after that we need to edit the actual information inside the file. You will see some of the information inside the file has already been setup by us (past developers), such as mongoDB credentials, port your want to run the server (default to 5000), any external API keys. These variables can be changed and should be set for the values needed for your own development, including your MongoDB information.

You can read more about environmental variables [here](https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/).
We also utilized the npm packaged, called [*dotenv*](https://www.npmjs.com/package/dotenv), to handle these environmenr variables.

## References
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Google Maps Documentation](https://developers.google.com/maps/documentation)
- [Environmental Variables](https://stackabuse.com/managing-environment-variables-in-node-js-with-dotenv/)