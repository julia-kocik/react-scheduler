describe('My React App', () => {
    it('should create an event and display it on the screen', () => {
        cy.visit('/');
    
        cy.get('#name').type('John');
        cy.get('#surname').type('Doe');
        cy.get('#email').type('john.doe@example.com');
        cy.get('#date').type('2023-12-01');
        cy.get('form').submit();
    
        cy.wait(2000);
    
        cy.contains('John'); 
        cy.contains('john.doe@example.com');
        cy.contains('2023-12-01');
        cy.contains('Event successfully created');
    });

    it('should display appropriate message when no fields filled', () => {
        cy.visit('/');

        cy.get('form').submit();

        cy.contains('Please fill in the following');
    });

    it('should properly validate email', () => {
        cy.visit('/');
    
        cy.get('#name').type('John');
        cy.get('#surname').type('Doe');
        cy.get('#email').type('invalid-email');
        cy.get('#date').type('2023-12-01');
        cy.get('form').submit();
    
        cy.contains('Please provide valid emai');
    });
});
  