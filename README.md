# kekchose-io

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.5.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
=======
# JsCHEKS
Javascript CHaotic Encryption Key System

## Synopsis
A javascript (babel) implementation of jCHECKS of Archos Research (available here: https://github.com/Archos-Research). The main idea is to use co-evolving chaotic systems to generate secret keys. These keys are used to encrypt or decrypt messages. We want it to be as secure as a crypto-secure pseudo random number generator and to be syncronisable. 

## Services
  I have separated the app into services.
  
### ChaoticSystem
  Contains the classes for the chaoticSystem and encapsulate the system into a Singleton. It contains theses classes:
  **ChaoticSystem**, **Agent**, **RuleSets**, **Rule**, **Utils**, **PRNG**

### AES Encrypter
  Contains the AES encrypter. 

### Communicator
  Websocket encapsulation service

## Motivation
This project is a proof of concept. I have done that mainly for learning purposes. 

## Warranty
I am not a cryptographic or security expert. I cannot provide any warranty or guarantees if you choose to use this code.

## Installation
  I used yoeman (http://yeoman.io/) to generate the base of the project. I used the angular-fullstack generator     (https://github.com/angular-fullstack/generator-angular-fullstack). The server is written in node-js with express. The client uses Angular-js (version 1). The whole project is written in babel to generate javascript, Jade (Now renamed to Pug) to generate HTML and Stylus to generate CSS.
  
  You can install it via npm with the following command:
  
  ```
  npm install something.. (TODO)
  ```

  Or you can download it and run:
  
  ```
  npm install
  bower install
  ```

## Run
  You can run the server on port 9000 with the following command:
  
  ```
  grunt serve
  ```
  
  Your browser should open a page at http//:localhost:9000 
  
## Tests
There is no unit tests for the moment. However, the Java implementation has been tested with the NIST SP 800-22 tests suite and a lot of other randomness tests. This javascript implementation has not been tested yet.

## Security
The whole project is not currently secure. I currently use ws protocol (Websockets) which is new and not secured over ssl. If you want to do something secure, start by using wss instead. Then I hav not (pen)tested the whole project for security holes.

## Contributors
I am currently the only one on the project, if you want to contribute, feel free to send me an e-mail at rousselm4@gmail.com.

## License
This repositery is under GNU General Public License v3.0.