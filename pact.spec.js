const { Verifier } = require('@pact-foundation/pact');
const { setupServer } = require('./pact.setup.js');

// config when pacts are passed as artifacts
const localPactConfig  = {
    provider: 'GraphQLProvider',
    providerBaseUrl: 'http://localhost:4000/',
    logLevel: 'WARN',
    pactUrls: ['./pacts/GraphQLConsumer-GraphQLProvider.json'],
  }

// config for free pact broker. Make sure you're running it on the http://localhost:9292
const freeBrokerConfig = {
    provider: 'graphql-provider',
    //pactUrls: [`./src/product/pacts/`,],
    logLevel: "INFO",
    providerBaseUrl: "http://localhost:4000/",
    pactUrls: [`http://localhost:9292`,],
    pactBrokerUrl: 'http://localhost:9292',
    providerVersion: '1.0.0',
    providerVersionBranch: 'master',
    publishVerificationResult: true,    // responsible for publishing results to the PactFlow
  };


describe('Pact Verification', () => {
    
    let server;
    beforeAll(() => {
      server = setupServer();
    });
    afterAll(() => {
      if (server) {
        server.close();
      }
    });
    
  it('validates the expectations of GraphQLConsumer', () => {
    return new Verifier(freeBrokerConfig).verifyProvider().then((output) => {
        console.log('Pact Verification Complete!', output);
      });
  });
});