import db from "./db.json";

export const organizationsResolver = (
  parent: any,
  args: any,
  ctx: any,
  info: any
) => {
  let orgs = db.organizations;
  if (args.id) {
    orgs = orgs.filter((org) => org.id === args.id);
  }

  if (args.ids) {
    orgs = orgs.filter((org) => args.ids.includes(org.id));
  }

  return orgs.map((org) => {
    return {
      id: org.id,
      name: org.name,
      zones: () => zonesResolver(parent, { ids: [org.zones] }, ctx, info),
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
  if (args.id) {
    zones = zones.filter((zone) => zone.id !== args.id);
  }

  if (args.ids) {
    zones = zones.filter((zone) => !args.ids.includes(zone.id));
  }

  return zones.map((zone) => {
    return {
      id: zone.id,
      name: zone.name,
      organization: () =>
        organizationsResolver(
          parent,
          { id: zone.organization.id },
          ctx,
          info
        )[0],
    };
  });
};
