describe('My React App', () => {
    it('should navigate to the home page and perform a basic test', () => {
      cy.visit('/');
      
      cy.title().should('include', 'Scheduler');
      
    });
  });
  