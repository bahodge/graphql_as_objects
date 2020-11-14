import { gql } from "apollo-server";

//////////////// DIRECT OBJECT /////////////////
export default gql`
  type Organization {
    id: ID!
    name: String!
    zones: [Zone!]!
  }

  type Zone {
    id: ID!
    name: String!
    organization: Organization
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
