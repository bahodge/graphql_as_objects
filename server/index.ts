import { ApolloServer } from "apollo-server";
import {
  organizationResolver,
  organizationsResolver,
  zoneResolver,
  zonesResolver,
} from "./resolvers";
import typeDefs from "./typeDefs";

const resolvers: any = {
  Query: {
    organization: organizationResolver,
    organizations: organizationsResolver,
    zone: zoneResolver,
    zones: zonesResolver,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
