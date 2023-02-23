describe("Blog app", () => {
	beforeEach(() => {
		const backendUrl = Cypress.env("BACKEND");
		const user1 = {
			name: "Matti Luukkainen",
			username: "mluukkai",
			password: "salainen",
		};

		const user2 = {
			name: "Petteri Luukkainen",
			username: "pluukkai",
			password: "salainen",
		};

		cy.request("POST", `${backendUrl}/testing/reset`);
		cy.request("POST", `${backendUrl}/users`, user1);
		cy.request("POST", `${backendUrl}/users`, user2);

		cy.visit("");
	});

	it("Login form is shown", () => {
		cy.contains("Log in to application");
	});

	describe("Login", () => {
		it("succeeds with correct credentials", () => {
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("salainen");
			cy.get("#login").click();

			cy.contains("Logged in as mluukkai");
		});

		it("fails with wrong credentials", () => {
			cy.get("#username").type("mluukkai");
			cy.get("#password").type("vaara");
			cy.get("#login").click();

			cy.contains("Invalid username or password");
		});
	});

	describe("When logged in", () => {
		beforeEach(() => {
			cy.login({ username: "mluukkai", password: "salainen" });
		});

		it("a blog can be created", () => {
			cy.contains("New Blog").click();

			cy.get("#blog-title").type("Testing blog creation");
			cy.get("#blog-author").type("Petteri");
			cy.get("#blog-url").type("https://google.fi");
			cy.get("#blog-create").click();

			cy.get("#blog-list").children().contains("Testing blog creation");
			cy.get("#blog-list").children().contains("Petteri");
		});

		describe("with a single initial blog", () => {
			beforeEach(() => {
				cy.createBlog({
					title: "Double quotes are better than single quotes",
					author: "Ender",
					url: "https://google.fi",
				});
			});

			it("the blog can be liked", () => {
				cy.get("button").contains("view").click();
				cy.get("button").contains("Like").click();

				cy.contains(1);
			});

			it("the blog can be removed", () => {
				cy.get("button").contains("view").click();
				cy.get("button").contains("Remove").click();

				cy.get("#blog-list").children().should("have.length", 0);
			});

			describe("that was not added by you", () => {
				beforeEach(() => {
					cy.login({ username: "pluukkai", password: "salainen" });
				});

				it("the blog doesn't have a Remove button", () => {
					cy.get("button").contains("view").click();

					cy.get("button").should("not.contain", "Remove");
				});
			});
		});

		describe("with multiple initial blogs", () => {
			beforeEach(() => {
				cy.createBlog({
					title: "Second most liked blog",
					author: "Petteri",
					url: "https://google.fi",
				});
				cy.createBlog({
					title: "Third most liked blog",
					author: "Petteri",
					url: "https://google.fi",
				});
				cy.createBlog({
					title: "First most liked blog",
					author: "Petteri",
					url: "https://google.fi",
				});
			});

			it("the blogs should be sorted by likes", () => {
				cy.get("#blog-list")
					.contains("Third most liked blog")
					.parent()
					.parent()
					.find("button")
					.click();
				cy.get("button").contains("Like").click();
				cy.contains(1);
				cy.get("button").contains("hide").click();

				cy.get("#blog-list")
					.contains("Second most liked blog")
					.parent()
					.parent()
					.find("button")
					.click();
				cy.get("button").contains("Like").click();
				cy.contains(1);
				cy.get("button").contains("Like").click();
				cy.contains(2);
				cy.get("button").contains("hide").click();

				cy.get("#blog-list")
					.contains("First most liked blog")
					.parent()
					.parent()
					.find("button")
					.click();
				cy.get("button").contains("Like").click();
				cy.contains(1);
				cy.get("button").contains("Like").click();
				cy.contains(2);
				cy.get("button").contains("Like").click();
				cy.contains(3);
				cy.get("button").contains("hide").click();

				cy.get("#blog-list")
					.children()
					.eq(0)
					.should("contain", "First most liked blog");
				cy.get("#blog-list")
					.children()
					.eq(1)
					.should("contain", "Second most liked blog");
				cy.get("#blog-list")
					.children()
					.eq(2)
					.should("contain", "Third most liked blog");
			});
		});
	});
});
