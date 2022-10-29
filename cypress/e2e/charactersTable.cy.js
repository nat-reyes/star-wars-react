import { checkData, validateApiInformation } from "../support/commands";

describe("Characters Table", () => {
  before(function () {
    cy.visit("http://localhost:3000");
    validateApiInformation("characters");
  });
  it("Should open the roles page", () => {
    cy.visit(`http://localhost:3000`);
  });

  it("Should correctly call characters API", () => {
    cy.request({
      method: "GET",
      url: "https://swapi.dev/api/people",
      qs: "results=1",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("results");
      expect(response.body).to.have.property("count");
    });
  });
  it("Should load data correctly", () => {
    checkData("characters.json", "GET", "https://swapi.dev/api/people");
  });
  it("Should search character name", () => {
    cy.get("input").type("Luke");
    cy.intercept(
      {
        url: "https://swapi.dev/api/people*",
        query: { search: "Luke" },
      },
      (req) => {
        req.continue((res) => {
          validateApiInformation("characters");
          expect(res.body.results[0]).to.have.property("name");
        });
      }
    );
  });
  it("Should correctly go to next page", () => {
    cy.visit(`http://localhost:3000`);
    cy.get('[data-test-id="go-to-next-page"]').click();
  });
  it("Should correctly go to previous page", () => {
    cy.visit(`http://localhost:3000`);
    cy.get('[data-test-id="go-to-previous-page"]').click();
  });
  it("Should has the correct columns name and position", () => {
    cy.visit(`http://localhost:3000`);
    cy.get('tr>th').each(($el, index, $list) => {

      if($el[0].cellIndex === 0) {
        expect($el[0].dataset['testId']).to.have.string("name")
      }
      if($el[0].cellIndex === 1) {
        expect($el[0].dataset['testId']).to.have.string("height")
      }
      if($el[0].cellIndex === 2) {
        expect($el[0].dataset['testId']).to.have.string("hair_color")
      }
      if($el[0].cellIndex === 3) {
        expect($el[0].dataset['testId']).to.have.string("eye_color")
      }
      if($el[0].cellIndex === 4) {
        expect($el[0].dataset['testId']).to.have.string("birth_year")
      }
      if($el[0].cellIndex === 5) {
        expect($el[0].dataset['testId']).to.have.string("gender")
      }
      if($el[0].cellIndex === 6) {
        expect($el[0].dataset['testId']).to.have.string("homeworld")
      }
      if($el[0].cellIndex === 7) {
        expect($el[0].dataset['testId']).to.have.string("starship")
      }
    })
  });
});
