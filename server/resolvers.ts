import db from "./db.json";

// export const organizationsResolver = (
//   parent: any,
//   args: any,
//   ctx: any,
//   info: any
// ) => {};

// export const zonesResolver = (
//   parent: any,
//   args: any,
//   ctx: any,
//   info: any
// ) => {};
// ////////////////////// DIRECT OBJECTS ///////////////////////////

export const organizationsResolver = (
  parent: any,
  args: any,
  ctx: any,
  info: any
) => {
  let orgs = db.organizations;
  if (args.input.id) {
    orgs = orgs.filter((org) => org.id === args.input.id);
  }

  if (args.input.ids) {
    orgs = orgs.filter((org) => args.input.ids.includes(org.id));
  }

  return orgs.map((org) => {
    return {
      id: org.id,
      name: org.name,
      zones: () =>
        zonesResolver(
          parent,
          args || { input: { ids: [org.zones] } },
          ctx,
          info
        ),
    };
  });
};

export const zonesResolver = async (
  parent: any,
  args: any,
  ctx: any,
  info: any
) => {
  let zones = db.zones;

  if (!args.input) return [];

  if (args.input.ids) {
    zones = zones.filter((zone) => args.input.ids.includes(zone.id));
  }

  return zones.map((zone) => {
    return {
      id: zone.id,
      name: zone.name,
      organization: () =>
        organizationResolver(
          parent,
          { input: { id: zone.organization } },
          ctx,
          info
        ),
    };
  });
};
export const organizationResolver = async (
  _parent: any,
  args: any,
  _ctx: any,
  _info: any
) => {
  let organizations = db.organizations;
  if (!args.input) return null;

  const organization = organizations.find((org) => org.id === args.input.id);

  if (!organization) return null;

  return {
    ...organization,
    zones: () =>
      zonesResolver(
        _parent,
        { input: { ids: organization.zones } },
        _ctx,
        _info
      ),
  };
};

export const zoneResolver = async (
  _parent: any,
  args: any,
  _ctx: any,
  _info: any
) => {
  let zones = db.zones;
  if (!args.input) return null;

  const zone = zones.find((zone) => zone.id === args.input.id);

  if (!zone) return null;

  return {
    ...zone,
    organization: () =>
      organizationResolver(
        _parent,
        { input: { id: zone.organization } },
        _ctx,
        _info
      ),
  };
};
