"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers = {
    Query: {
        organization: resolvers_1.organizationResolver,
        organizations: resolvers_1.organizationsResolver,
        zone: resolvers_1.zoneResolver,
        zones: resolvers_1.zonesResolver,
    },
};
const server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs_1.default, resolvers });
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map