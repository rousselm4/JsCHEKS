# JsCHEKS
Javascript CHaotic Encryption Key System

## Synopsis

At the top of the file there should be a short introduction and/ or overview that explains **what** the project is. This description should match descriptions added for package managers (Gemspec, package.json, etc.)
A javascript (babel) implementation of jCHECKS of Archos Research (available here: https://github.com/Archos-Research). The main idea is to use co-evolving chaotic systems to generate secret keys. These keys are used to encrypt or decrypt messages. We want it to be as secure as a crypto-secure pseudo random number generator and to be syncronisable. 

## Services

### ChaoticSystem

### AESEncrypter

### Communicator

## Motivation

This project is a proof of concept. I have done that mainly for learning purposes.

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
