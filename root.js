const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
    product: String
    square(number: Int!): Int
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
      return 'Hello world!';
    },
    product: () => {
      return 'phone';
    },
    square: ({ number }) => {
      return number * number;
    },
  };


module.exports = {
    schema,
    root
};