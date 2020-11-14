import { ApolloServer } from "apollo-server";
import {
  organizationResolver,
  organizationsResolver,
  zoneResolver,
  zonesResolver,
} from "./resolvers";
import typeDefs from "./typeDefs";
import User from "./User";

const resolvers: any = {
  Query: {
    organization: organizationResolver,
    organizations: organizationsResolver,
    zone: zoneResolver,
    zones: zonesResolver,
  },
};

const rawUser = {
  id: "userid",
  name: "benji",
  organizationMemberships: [
    {
      organization: {
        id: "org0id",
        name: "organization 0",
      },
      zoneMemberships: [
        {
          zone: {
            id: "zone0id",
            name: "zone 0",
          },
        },
      ],
    },
  ],
};

const currentUser = new User(rawUser);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { currentUser },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
