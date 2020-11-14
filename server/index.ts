import { ApolloServer, gql } from "apollo-server";
import { organizationsResolver, zonesResolver } from "./resolvers";

const typeDefs: any = gql`
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

const resolvers: any = {
  Query: {
    organizations: organizationsResolver,
    zones: zonesResolver,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
