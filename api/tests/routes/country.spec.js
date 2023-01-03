/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: 'Milanea a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
  });
});


// describe('POST' '/recipes', () => {
//   it('Agrega un nuevo Post', () => {
//     const post = { name: 'macaroni and cheese', summary: 'The famous mac and cheese has boiled noodles and a cheese cream that is generally made with melted cheddar cheese, although it could be made with other cheeses, but the typical flavor of this dish is given by cheddar.'};
//     return addPost(post)
//       .then((postReturned) => {
//         expect(postReturned).to.deep.equal(post);
//       });
//   });

//   it('Reports missing parameter name' `name`', () => {
//     return req(POST, 404, { summary: 'summary'});
//   });

//   it('Reports missing parameter name' `summary`', () => {
//     return req(POST, 404, { name: 'name'});
//   });

// });
