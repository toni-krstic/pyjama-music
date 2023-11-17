describe("E2E Test", () => {
  it("should visit Discover Page Change Genre", () => {
    cy.visit("/");
    cy.url().should("include", "/");

    cy.get("button").click();
    cy.get("span").contains("Dance").click();
    cy.get("button").should("contain", "Dance");
  });

  it("should vist around you page ", () => {
    cy.visit("/");
    cy.url().should("include", "/");

    cy.get('[href="/around-you"]').first().click();
    cy.url().should("include", "/around-you");
    cy.wait(5000);
    cy.get("h2").should("contain", "Around You");
  });

  it("should vist top charts page ", () => {
    cy.visit("/");
    cy.url().should("include", "/");

    cy.get('[href="/top-charts"]').first().click();
    cy.url().should("include", "/top-charts");
    cy.wait(5000);
    cy.get("h2").should("contain", "Discover Top Charts");
  });

  it("should visit top artists and go to top artist songs when clicked on artist", () => {
    cy.visit("/");
    cy.url().should("include", "/");

    cy.get('[href="/top-artists"]').first().click();
    cy.url().should("include", "/top-artists");
    cy.get('[alt="artist"]').first().click();
    cy.wait(5000);
    cy.get("h2").should("contain", "Top Songs By:");
  });

  it("should Search for songs ", () => {
    cy.visit("/");
    cy.url().should("include", "/");

    cy.get("[id=search-field]").type("Test{enter}");
    cy.url().should("include", "/search/Test");
  });

  it("should play song, go to next song, previous song, mute unmute, pause song", () => {
    cy.visit("/");
    cy.url().should("include", "/");

    cy.get('[alt="song_img"]').first().trigger("mouseover");
    cy.wait(500);
    cy.get('[data-testid="play-icon"]').first().click({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="next-button"]').click();
    cy.wait(1000);
    cy.get('[data-testid="prev-button"]').click();
    cy.wait(1000);
    cy.get('[data-testid="volume-mute-icon"]').click();
    cy.wait(1000);
    cy.get('[data-testid="volume-unmute-icon"]').click();
    cy.wait(1000);
    cy.get('[data-testid="pause-button"]').click();
  });
});
