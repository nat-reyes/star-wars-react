export const validateApiInformation = (fixture) => {
  cy.fixture(fixture).then(function (characters) {
    this.characters = characters;
  });
};

export const checkData = (fixture, method, url) => {
  cy.intercept(method, url, { fixture: fixture });
};
