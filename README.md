<h1 align="center">Welcome to GoMarketplace 📱</h1>
<p align="center">
  <img alt="Capa" src="https://github.com/twistershark/goMarketplace/blob/master/images/Capa.png" />
</p>

<h1 align="center">
  <img alt="goMarketplace" src="https://github.com/twistershark/goMarketplace/blob/master/images/app.gif" />
</h1>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000" />
</p>

---
# 📑 Index

- [About](#-about)
- [Technologies](#-technologies)
- [Prerequisites](#-prerequisites)
- [How to use this project](#-how-to-use-this-project)
- [Tests](#-run-tests)
- [Author](#-author)
- [Contributing](#-contributing)
- [License](#-license)
---

## 📋 About

A simple store app build with **React Native**. It was developed to practice **routes**, **AsyncStorage** and **Context API** concepts. Build with **Typescript**!

---

## 🚀 Technologies

- [React Native](https://reactnative.dev/)
- [Axios](https://www.npmjs.com/package/axios)
- [React Navigation](https://reactnavigation.org/)
- [Styled Components](https://styled-components.com/)

---

## 🔧 Prerequisites

- Android emulator or iOS simulator.

---
## 🌟 How to use this project

```sh

  # Clone the repository
  $ git clone https://github.com/twistershark/goMarketplace.git

  # Enter the repository
  $ cd goMarketplace

  # install all depencies
  $ yarn

  # Open a new terminal window for each command below:

  # to start a fake api to list products
  $ yarn json-server server.json -p 3333

  # if you are using Android emulator, run this command:
  $ adb reverse tcp:3333 tcp:3333

  # to start metro bundler from React Native
  $ yarn start

  # to start Android emulator or iOS simulator
  $ yarn android / yarn ios

```

## 🏗 Run tests

```sh
yarn test
```

## 🤓 Author

👤 **Paulo Victor da Silva**

* Github: [@twistershark](https://github.com/twistershark)
* LinkedIn: [@paulovictorsilva](https://linkedin.com/in/paulovictorsilva)

## Show your support

Give a ⭐️ if this project helped you!

## 🤝 Contributing
Feel free to contribute to this project. Every help is welcome!

---

## 📃 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
