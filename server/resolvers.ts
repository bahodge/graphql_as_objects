import db from "./db.json";

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
  if (args.input.id) {
    zones = zones.filter((zone) => zone.id !== args.input.id);
  }

  if (args.input.ids) {
    zones = zones.filter((zone) => !args.input.ids.includes(zone.id));
  }

  return zones.map((zone) => {
    return {
      id: zone.id,
      name: zone.name,
      organization: () =>
        organizationsResolver(
          parent,
          { input: { id: zone.organization } },
          ctx,
          info
        )[0],
    };
  });
};
