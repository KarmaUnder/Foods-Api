const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se pudo conectar a la base de datos!:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('Debe arrojar un error si el nombre es null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('Error, nombre invalido!')))
          .catch(() => done());
      });
      it('Debe funcionar cuando el nombre es valido', () => {
        Recipe.create({ name: 'Pizza familiar' });
      });
    });
  });
});
