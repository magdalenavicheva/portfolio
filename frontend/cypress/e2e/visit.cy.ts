describe("A recruiter's visit", () => {
    beforeEach(() => {
        cy.viewport(1440, 900)
        cy.visit("/")
    })

    it("sees About me and the Projects folder straight away", () => {
        cy.get('[role="dialog"][aria-labelledby="win-about-title"]').should("be.visible")
        cy.get('[role="dialog"][aria-labelledby="win-projects-title"]').should("be.visible")
        cy.contains("Open to internships").should("be.visible")
    })

    it("opens a project and its GitHub link", () => {
        cy.contains("button", "Triply").click()
        cy.get('[aria-labelledby="win-project-title"]')
            .find('a[href="https://github.com/magdalenavicheva/triply-frontend"]')
            .should("have.attr", "target", "_blank")
        cy.location("hash").should("eq", "#triply")
    })

    it("drags a window by its title bar", () => {
        cy.get('[aria-labelledby="win-about-title"]').then(($win) => {
            const before = $win[0].getBoundingClientRect().left
            cy.get('[aria-labelledby="win-about-title"] .window__bar')
                .trigger("pointerdown", { button: 0, clientX: 400, clientY: 80, pointerId: 1 })
                .trigger("pointermove", { clientX: 520, clientY: 120, pointerId: 1 })
                .trigger("pointerup", { pointerId: 1 })
            cy.get('[aria-labelledby="win-about-title"]').should(($after) => {
                expect($after[0].getBoundingClientRect().left).to.be.greaterThan(before)
            })
        })
    })

    it("switches language and theme", () => {
        cy.contains("button", "BG").click()
        cy.contains("За мен").should("exist")
        cy.get("html").then(($html) => {
            const before = $html.attr("data-theme")
            cy.get("button.icon-btn").click()
            cy.get("html").should("not.have.attr", "data-theme", before)
        })
    })

    it("offers an e-mail button in the Contact window", () => {
        cy.get(".menubar__menu").contains("Contact").click()
        cy.contains("a", "Write me an e-mail")
            .should("have.attr", "href")
            .and("match", /^mailto:mvicheva2024@gmail\.com\?subject=/)
    })

    it("becomes a home screen on phones", () => {
        cy.viewport(390, 844)
        cy.reload()
        cy.get(".os--mobile").should("exist")
        cy.get("#desktop-icons").contains("Projects").click()
        cy.contains("button", "Back").should("be.visible")
    })
})
