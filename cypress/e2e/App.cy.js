describe('My React App', () => {
    it('should create an event and display it on the screen', () => {
        cy.visit('/');
    
        const nameInput = cy.get('#name').type('John');
        const surnameInput = cy.get('#surname').type('Doe');
        const emailInput = cy.get('#email').type('john.doe@example.com');
        const dateInput = cy.get('#date').type('2023-12-01');
        cy.get('form').submit();
    
        cy.wait(2000);
    
        cy.contains('John'); 
        cy.contains('john.doe@example.com');
        cy.contains('2023-12-01');
        cy.contains('Event successfully created');
        nameInput.should('have.value', '');
        surnameInput.should('have.value', '');
        emailInput.should('have.value', '');
        dateInput.should('have.value', '');
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

    it('should show form on clicking update and show event back when clicking cancel', () => {
        cy.visit('/');
      
        cy.get('#newName').should('not.exist');
        cy.get('#newSurname').should('not.exist');
        cy.get('#newEmail').should('not.exist');
        cy.get('#newDate').should('not.exist');
      
        cy.contains('button', 'Update').click();
      
        cy.get('#newName').should('exist');
        cy.get('#newSurname').should('exist');
        cy.get('#newEmail').should('exist');
        cy.get('#newDate').should('exist');

        cy.contains('button', 'Cancel').click();

        cy.get('#newName').should('not.exist');
        cy.get('#newSurname').should('not.exist');
        cy.get('#newEmail').should('not.exist');
        cy.get('#newDate').should('not.exist');

    })
    it('should properly update when all arguments provided', () => {
        cy.visit('/');
      
        cy.contains('button', 'Update').click();
      
        cy.get('#newName').type('Mary');
        cy.get('#newSurname').type('Smith');
        cy.get('#newEmail').type('marysmith@email.com');
        cy.get('#newDate').type('2023-12-16');
      
        cy.contains('button', 'Save').click();
      
        cy.wait(2000);
      
        cy.contains('Mary');
        cy.contains('marysmith@email.com');
        cy.contains('2023-12-16');
        cy.contains('Event successfully updated');
      });
    
      it('should properly update when some arguments provided', () => {
        cy.visit('/');
        cy.contains('button', 'Update').click();
      
      
        cy.get('#newName').type('Anne');
        cy.get('#newDate').type('2023-12-18');
      
        cy.contains('button', 'Save').click();
      
        cy.wait(2000);
      
        cy.contains('Anne');
        cy.contains('2023-12-18');
        cy.contains('Event successfully updated');
      });

      it('should show proper message when none arguments provided', () => {
        cy.visit('/');
        cy.contains('button', 'Update').click();
      
        cy.contains('button', 'Save').click();
      
        cy.wait(2000);
        cy.contains('You have not provided any argument to update');
      });

      it('should properly remove element', () => {
        cy.visit('/');

        cy.contains('Anne').should('exist')
        cy.contains('2023-12-18').should('exist')

        cy.contains('span', 'X').click();
            
        cy.wait(2000);
        cy.contains('Event successfully deleted');
        cy.contains('Anne').should('not.exist')
        cy.contains('2023-12-18').should('not.exist')
      });
});
  