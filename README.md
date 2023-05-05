<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">EOA QUERY UI</h3>

  <p align="center">
    The EOA Query UI, 
    <br />
    <a href="https://eoa-query.w3w.app/">View Demo</a>
    ·
    <a href="https://github.com/ContractLabs/eoa-query-ui/issues">Report Bug</a>
    ·
    <a href="https://github.com/ContractLabs/eoa-query-ui/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

Set an appointment date, connect wallet to submit date, come to an appointment to get the link of the csv file that has queried "n" for eoa wallet with the highest eth balance on DEXs (sushiswap, uniswap).


### Built With

* [![TypeScript][TypeScript.ts]][TypeScript-url]
* [![React][React.js]][React-url]



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* yarn 
  ```sh
  npm install --global yarn
  ```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ContractLabs/eoa-query-ui.git
   ```
2. Install packages
   ```sh
   npm install 
   ```
   or
   ```sh
   yarn
   ```
3. Run
   ```sh
   yarn start
   ```
4. If have some issue with submit, you can try config like this
   <br/>
   In [eoa-query-ui/src/App.tsx](https://github.com/tasiby/eoa-query-ui/blob/main/src/App.tsx)
   ```sh
   const urlAPI = "http://localhost:3333";
   ```
   In [eoa-query-ui/package.json](https://github.com/tasiby/eoa-query-ui/blob/main/package.json)
   ```sh
   "scripts": {
       "start": "PORT=3333 react-scripts start",
        ...
   ```


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ContractLabs/eoa-query.svg?style=for-the-badge
[contributors-url]: https://github.com/ContractLabs/eoa-query/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ContractLabs/eoa-query.svg?style=for-the-badge
[forks-url]: https://github.com/ContractLabs/eoa-query/network/members
[stars-shield]: https://img.shields.io/github/stars/ContractLabs/eoa-query.svg?style=for-the-badge
[stars-url]: https://github.com/ContractLabs/eoa-query/stargazers
[issues-shield]: https://img.shields.io/github/issues/ContractLabs/eoa-query.svg?style=for-the-badge
[issues-url]: https://github.com/ContractLabs/eoa-query/issues
[TypeScript.ts]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square
[TypeScript-url]: https://www.typescriptlang.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
