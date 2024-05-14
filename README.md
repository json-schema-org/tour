# Tour of JSON Schema

This repository contains the code for the Tour of JSON Schema project.
https://json-schema-org.github.io/tour

# Development

The project is built using next.js.

after cloning the repository, create a `.env` file in the root of the project with the following content:

```python
MODE = "local"
```

Then run the following command to install the dependencies:

```bash
yarn install
```

To start the development server, run the following command:

```bash
yarn dev
```

> when you run `yarn dev`, a file named `outline.json` will be created in th `/content` directory. This file is used to generate the table of contents for the website.
