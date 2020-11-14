"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const typeDefs = apollo_server_1.gql `
  type Organization {
    id: ID!
    name: String!
    zones: [Zone!]!
  }

  type Zone {
    id: ID!
    name: String!
    organization: Organization!
  }

  input OrganizationsInput {
    id: ID
    ids: [ID!]
  }

  input ZonesInput {
    id: ID
    ids: [ID!]
  }

  type Query {
    organizations(input: OrganizationsInput): [Organization!]!
    zones(input: ZonesInput): [Zone!]!
  }
`;
const resolvers = {
    Query: {
        organizations: resolvers_1.organizationsResolver,
        zones: resolvers_1.zonesResolver,
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map