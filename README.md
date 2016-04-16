# JsCHEKS
Javascript CHaotic Encryption Key System

## Synopsis
A javascript (babel) implementation of jCHECKS of Archos Research (available here: https://github.com/Archos-Research). The main idea is to use co-evolving chaotic systems to generate secret keys. These keys are used to encrypt or decrypt messages. We want it to be as secure as a crypto-secure pseudo random number generator and to be syncronisable. 

## Services

### ChaoticSystem
Contains the classes for the chaoticSystem and encapsulate the system into a Singleton. It contains theses classes:
**ChaoticSystem**, **Agent**, **RuleSets**, **Rule**, **Utils**, **PRNG**

### AESEncrypter
Contains the AES encrypter. 

### Communicator
Websocket encapsulation service

## Motivation

This project is a proof of concept. I have done that mainly for learning purposes. 

## Warranty

I am not a cryptographic or security expert. I cannot provide any warranty or guarantees if you choose to use this code.

## Installation

Todo
npm install something..


## Tests

There is no unit tests for the moment. However, the Java implementation has been tested with the NIST SP 800-22 tests suite and a lot of other randomness tests. This javascript implementation has not been tested yet.

## Security

The whole project is not currently secure. I currently use ws protocol (Websockets) which is new and not secured over ssl. If you want to do something secure, start by using wss instead. Then I hav not (pen)tested the whole project for security holes.

## Contributors

I am currently the only one on the project, if you want to contribute, feel free to send me an e-mail at rousselm4@gmail.com.

## License

This repositery is under GNU General Public License v3.0.
