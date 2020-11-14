type OrganizationType = {
  id: string;
  name: string | void;
  zones: ZoneType[];
};

type ZoneType = {
  id: string;
  name: string | void;
  organization: OrganizationType | void;
};

type ZoneMembershipType = {
  zone: ZoneType;
};

type OrganizationMembershipType = {
  organization: OrganizationType;
  zoneMemberships: ZoneMembershipType[];
};

export type UserType = {
  id: string;
  name: string | void;
  organizationMemberships: OrganizationMembershipType[];
  isMemberOfOrganization: (id: string) => boolean;
  isMemberOfZone: (id: string) => boolean;
};

export default class User {
  name: string;
  id: string;
  organizationMemberships: OrganizationMembershipType[];

  constructor(rawUser: any) {
    this.name = rawUser.name;
    this.id = rawUser.id;
    this.organizationMemberships = rawUser.organizationMemberships;
  }

  public isMemberOfOrganization(id: string) {
    return this.organizationMemberships.some((orgMembership) => {
      return orgMembership.organization.id === id;
    });
  }

  public isMemberOfZone(id: string) {
    return this.organizationMemberships.some((orgMembership) => {
      return orgMembership.zoneMemberships.some(
        (zoneMembership) => zoneMembership.zone.id === id
      );
    });
  }
}
