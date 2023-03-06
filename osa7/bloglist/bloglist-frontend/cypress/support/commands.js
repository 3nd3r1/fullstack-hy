// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
	const backendUrl = Cypress.env("BACKEND");

	cy.request("POST", `${backendUrl}/login`, {
		username,
		password,
	}).then(({ body }) => {
		localStorage.setItem("userSession", JSON.stringify(body));
		cy.visit("");
	});
});

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
	const backendUrl = Cypress.env("BACKEND");
	const token =
		"Bearer " + JSON.parse(localStorage.getItem("userSession")).token;
	cy.request({
		method: "POST",
		url: `${backendUrl}/blogs`,
		body: {
			title,
			author,
			url,
		},
		headers: { Authorization: token },
	}).then(({ body }) => {
		cy.visit("");
	});
});
