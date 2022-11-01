# Star Wars Characters App

This project requests from the [STAR-WARS-API](https://swapi.dev/) the star wars characters.
The project has a styled table to show the character requests. This table allows pagination to quickly move between different characters' page requests. Also, it includes a filter to search for characters and another one to filter characters by gender.

The project is storing data with Redux with the objective of avoiding extra requests. Instead, it searches inside the Redux if the information already exists to show it.

The <Table/ > can be easily reused.

## Get Started

**Clone repository**

```
git clone https://github.com/nat-reyes/star-wars-react.git
```

**Install dependencies**
```
npm install
```

**Start development server**

```
npm start
```
## Available Scripts

In the project directory, you can run:

`npm start` Starts development server.

`npm run tests` Runs tests.

`npm run lint` Runs lint . fix command to clean the project files with the linter configuration.

`npm run cypress` Runs cypress.

## Technologies

**React**
-  is a free and open-source front-end JavaScript library for building user interfaces based on UI components.

**Redux**
- You can use [Redux Devtools's extension](https://github.com/zalmoxisus/redux-devtools-extension).

**Styled-Components**
- You can see [Styled-Components](https://styled-components.com/)

**Cypress**
- For e2e testing. [Cypress](https://www.cypress.io/)

**Eslint && Prettier**
- For formatting the project files.
- [Eslint.js](https://eslint.org/)
- [Prettier.js](https://prettier.io/)

