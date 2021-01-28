# MyAnimeList Manager

MyAnimeList Manager is a React/Express web application designed to augment the experience on managing your Anime Lists from the MyAnimeList website, removing all the extra fluff from the website and giving you a minimalist interface for updating your lists and search for entries. In addition, the schedule tab shows you all the airing shows on your list, allowing you to keep track of which shows you need to watch and when.

mal-manager-server is the backend of this web application. To view and setup the frontend, please visit https://github.com/MarcusChok110/mal-manager-client.

## Live Demo

The live demo of the server is at the following link: https://mal-manager-server.herokuapp.com/

## Local Installation

Firstly, ensure that you have Node/NPM installed on your system. Then:

1. Download the repository
2. cd to the directory and `npm install` the dependencies
3. Ensure you have the following dependencies installed:

```
    "axios"
    "base64url"
    "cookie-parser"
    "cors"
    "dotenv"
    "express"
    "helmet"
    "randomstring"
```

4. Obtain an API key from MyAnimeList. More information on that [here](https://myanimelist.net/blog.php?eid=835707)
5. Set up a .env file with the following values:

```
    CLIENT_ID=<YOUR_CLIENT_ID_HERE>
    CLIENT_SECRET=<YOUR_CLIENT_SECRET_HERE>
    PORT=8888
    COOKIE_SECRET=<RANDOMLY_GENERATED_HASH_STRING_HERE>
    NODE_ENV=development
```

6. You may have to go to `session.js:63-64` and delete the following lines if the cookies aren't being transferred:

```
    sameSite: 'none',
    secure: true,
```

7. `npm start` and the server should be up and running on http://localhost:8888 in the browser
8. Setup the [client-side](https://github.com/MarcusChok110/mal-manager-client) to view the full project on http://localhost:3000

## Todo

- Adjust routes to be more RESTful
- Refactor cookies to transfer refresh token instead of auth token
