# Pokedex app

## Description

The Pokédex is a web-based application designed to help Pokémon enthusiasts explore and learn more about their favorite Pokémon creatures. It provides an intuitive and user-friendly interface for users to browse and search for Pokémon, as well as the ability to mark their favorite Pokémon.

### Key Features

- Pokemon List
- Search Feature
- Favorite Pokemon


## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

## Requirements

- MongoDB
Install MongoDB
https://www.mongodb.com/download-center/community/releases/archive
Ensure to download the last version
- Node
Version: v20.7.0
- NPM
Version: 10.1.0

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/oscarsanabria28/pokedex.git

2. ### Run the MongoDB Server

    ```bash
   mongod --dbpath=<YOUR DATA DIRECTORY>

3. ### Run the Server

    Navigate to the "server" directory inside the cloned repository using the terminal:

    ```bash
    cd pokedex/server
    ```
    Then, start the server by running:

    ```bash
    npm start
    ```
    The server should now be up and running on http://localhost:4000, allowing you to access the Pokédex in your web browser.

3. ### Run the React App

    Navigate to the "client" directory inside the cloned repository using the terminal:

    ```bash
    cd pokedex/client
    ```
    Then, start the server by running:

    ```bash
    npm start
    ```
    The Client App should now be up and running on http://localhost:3000, allowing you to access the Pokédex in your web browser.


### Usage

Once the server is up and running, you can start using the Pokédex in your browser http://localhost:3000

#### User management

In the TopBar you will see a random user created at the first time of the app do the query for the lists.
You can change this user value in the local.storage setting a new value for the variable `userUIID`

#### Screenshot of the app

![Pokedex App](/assets/ss_home.png)