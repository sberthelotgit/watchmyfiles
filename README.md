# WatchMyFiles

Watch my file is a simple folder listener allowing user to identify which file has been viewed (Movies, Pictures, Books, ...)

In future, it will also provide additional information depending on the type of file : ( can also

- Movie's IMBD information
- Book ISBNdb information
- ...

## Information

- This application contains a back-end and front-end part :
  - Back-End will watch local or network folder in order to fill a database (mongo)
  - Front-end will show found file on the server to bring informations and allow user to mark them as watched

## Installation

- Back-End :
  - Use environnement variable 'FOLDERS' to define folder to watch
    - i.e. : config:set FOLDERS="/data/movies,/data/pictures,/data/books"
  - Use environnement variable 'DB' to configure mongo database URL

- Front-End
  - TBD

## Tech

Part of the Library/Framework used for this project :

- [Mongo] Free and open-source cross-platform document-oriented database
- [Express] - Web Application framework for nodejs
- [Angular] - TypeScript-based open-source front-end web application platform
- [Nodejs] - JavaScript run-time environment (For back-end I/O)
- [Angular Material] - Web Component library for Angular based application

## Docker

In order to run this app in a docker :

```sh
cd WatchMyFiles
docker build -t <your username>/watchmyfiles-app .
```

You can then start the docker image with (You can change the port in the file watchmyfile-docker) :

```sh
docker run -p 49160:8080 -d <your username>/node-web-app
```

## Todos

- Add support for smb storage
- Use file library to improve directory browsing
- Add movie, books api integration (Store information in mongo?)
- Improve angular view to show api information
- Add error handling
- Add test...
- Add possibility to mark files as Viewed or Read
- Add authentication for file read or viewed per profile

## License

----

MIT

[//]: #
[gitrepo]: <https://github.com/joemccann/dillinger.git>
[mongo]: <https://www.mongodb.com/>
[express]: <http://expressjs.com>
[angular]: <https://angular.io/>
[nodejs]: <http://nodejs.org>
[angular material]: <https://material.angular.io/>
  