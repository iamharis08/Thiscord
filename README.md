# This.cord

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
<!-- [![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url] -->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/iamharis08/Thiscord">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">This.cord</h3>

  <p align="center">
    Thiscord: A Discord Clone Project
    <br />
    <a href="https://github.com/iamharis08/Thiscord/wiki"><strong>Checkout the Docs »</strong></a>
    <br />
    <br />
    <a href="https://this-cord.onrender.com/">View Demo Site</a>
    ·
    <a href="https://github.com/iamharis08/Thiscord/issues">Report Bug</a>
    ·
    <!-- <a href="https://github.com/jacoblauxman/AirBnB-Proj/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This is a fullstack clone group project bringing together the backend and frontend to approximate a recreation of Discord and some of their site's main features


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
* ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
* ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Below is how you can get the project started in a local environment

### Prerequisites

You will need to define a .env file for the backend to setup a database as well as filepath, and generate a CSRF Token / SECRET_KEY
* Ex: .env
  ```sh
  SECRET_KEY=SECRET_KEY_HERE
  DATABASE_URL=sqlite:///dev.db
  SCHEMA=flask_schema
  FLASK_DEBUG=true
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/iamharis08/Thiscord.git
   ```
2. Install Backend in /backend Dependencies via requirements.txt
   ```sh
   pipenv install -r requirements.txt
   ```
3. Install Frontend Dependencies in /frontend/react-app
   ```sh
   npm install
   ```
4. Get into pipenv, migrate database and seed, run Flask app
   ```sh
   pipenv shell
   ```   
   ```sh
   flask db upgrade
   ```   
   ```sh
   flask seed all
   ```   
   ```sh
   flask run
   ```   
5. Start up Frontend React-App to connect to Backend
  ```sh
  npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Goal of this project is to accurately imitate/clone the aspects of Discord's website, specifically their handling of user and spot data as well as reviews -- full CRUD operations!


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] User - Login/Logout, Signup, Restore Session and permissions within site
- [ ] Servers - Show all in display, see details of specific server, add  a server as well as channels of server and its users
- [ ] Channels - Show all messages of channel, and implement a message feature via sockets for real time updates
- [ ] Live Chat - Send and receive messages in channels within a given channel, messages realtime update for all users in channel
- [ ] Message Search - Search through a given channel's messages by text to display all matches to the user


    <!-- - [ ] Nested Feature -->

See the [open issues](https://github.com/iamharis08/Thiscord/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>







<!-- LICENSE -->
<!-- ## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p> -->



<!-- CONTACT -->
## Contact
Jacob Lauxman - jlauxman@gmail.com
<!-- Jacob Lauxman - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com -->

Project Link: [https://github.com/iamharis08/Thiscord](https://github.com/iamharis08/Thiscord)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thankful for all the instructional and peer support in all areas of this project
<!-- * []()
* []()
* []() -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/iamharis08/Thiscord.svg?style=for-the-badge
[contributors-url]: https://github.com/iamharis08/Thiscord/graphs/contributors

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ExpressJS-url]: https://expressjs.com/
[Sequelize-url]: https://sequelize.org/
