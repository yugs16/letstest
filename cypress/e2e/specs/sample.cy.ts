/// <reference types="cypress" />

const getContainer = () => {
	return cy.get('[data-testid="card-view-container"]');
};

describe('template spec', async () => {
	beforeEach(() => {
		cy.visitPage();
	});
	it('Check default page rendering, copy bounty, and paste it in another ', () => {
		cy.window().then((win) => {
			cy.stub(win.navigator.clipboard, 'writeText').resolves();
		});

		// cy.intercept('GET', '/api/v1/characters').as('getCharacters');

		// // https://on.cypress.io/wait
		// cy.wait('@getCharacters')
		// 	.its('response.statusCode')
		// 	.should('be.oneOf', [200, 304]);

		getContainer().find('img').should('have.length', 20);

		// checking if the first container is as expected
		getContainer()
			.children()
			.first()
			.find('.MuiTypography-h5')
			.should('be.visible')
			.contains(/Monkey D Luffy/i);

		getContainer()
			.children()
			.first()
			.find('button[data-testid="test_copy_btn"]')
			.should('exist')
			.click();

		cy.get('.MuiAlert-message').should('be.visible');

		cy.window().then((win) => {
			expect(win.navigator.clipboard.writeText).to.have.been.calledOnce;
		});

		getContainer()
			.children()
			.eq(1)
			.find('button[aria-label="Edit Bounty"]')
			.click();

		cy.wait(500);

		const dialogPath = '[role="dialog"]';

		// changing value of edit bounty
		cy.get(dialogPath)
			.find('.MuiDialogContent-root')
			.find('input[name="bounty"]')
			.clear()
			.type('999.999');

		// clicking Save button
		cy.get(dialogPath).find('button').eq(1).should('exist').click();
		cy.wait(200);

		cy.get('.MuiSnackbar-root').should('be.visible').contains(/saved/i);
	});

	it('Selection of crews should render cards as expected', () => {
		cy.get('[data-cy="cy-select-comp"]').find('[role="combobox"]').click();

		cy.get('ul[role="listbox"]').find('li').last().click();

		getContainer().find('img').should('have.length', 3);
	});
});
