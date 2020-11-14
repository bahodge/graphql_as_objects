"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
//////////////// DIRECT OBJECT /////////////////
exports.default = apollo_server_1.gql `
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
    ids: [ID!]!
  }

  input OrganizationInput {
    id: ID!
  }

  input ZonesInput {
    ids: [ID!]!
  }

  input ZoneInput {
    id: ID!
  }

  type Query {
    organization(input: OrganizationInput!): Organization
    organizations(input: OrganizationsInput!): [Organization!]!
    zone(input: ZoneInput!): Zone
    zones(input: ZonesInput!): [Zone!]!
  }
`;
// export default gql`
//   interface Node {
//     id: ID!
//   }
//   type Organization implements Node {
//     id: ID!
//     name: String!
//     zones: [Zone!]!
//   }
//   type Zone implements Node {
//     id: ID!
//     name: String!
//     organization: Organization!
//   }
//   input OrganizationsInput {
//     id: ID
//     ids: [ID!]
//   }
//   input ZonesInput {
//     id: ID
//     ids: [ID!]
//   }
//   input NodeInput {
//     id: ID!
//   }
//   type Query {
//     node(input: NodeInput!): Node
//     organizations(input: OrganizationsInput): [Organization!]!
//     zones(input: ZonesInput): [Zone!]!
//   }
// `;
//# sourceMappingURL=typeDefs.js.map