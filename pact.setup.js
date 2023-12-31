const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { root, schema } = require('./root');

const setupServer = () => {
    const app = express();
    app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
     graphiql: true,
    }));

    const server = app.listen("4000");
    return server;
}

  module.exports = {
    setupServer
  };