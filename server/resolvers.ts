import db from "./db.json";
import User, { UserType } from "./User";

////////////////////// DIRECT OBJECTS ///////////////////////////

export const organizationsResolver = (
  parent: any,
  args: any,
  ctx: { currentUser: UserType },
  info: any
) => {
  if (!args.input.ids) return [];

  if (!ctx.currentUser) throw new Error("No current user");

  const filtered = args.input.ids.filter((id: string) => {
    return ctx.currentUser.isMemberOfOrganization(id);
  });

  const orgs = db.organizations.filter((org) => filtered.includes(org.id));

  return orgs.map((org) => {
    return {
      id: org.id,
      name: org.name,
      zones: () =>
        zonesResolver(parent, { input: { ids: org.zones } }, ctx, info),
    };
  });
};

export const zonesResolver = async (
  parent: any,
  args: any,
  ctx: { currentUser: UserType },
  info: any
) => {
  if (!args.input) return [];
  if (!args.input.ids) return [];

  if (!ctx.currentUser) throw new Error("No current user");

  const filtered = args.input.ids.filter((id: string) => {
    return ctx.currentUser.isMemberOfZone(id);
  });

  const zones = db.zones.filter((zone) => filtered.includes(zone.id));

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
  parent: any,
  args: any,
  ctx: any,
  info: any
) => {
  if (!args.input) return null;

  if (!ctx.currentUser) throw new Error("No current user");

  if (!ctx.currentUser.isMemberOfOrganization(args.input.id)) return null;

  const organization = db.organizations.find(
    (organization) => args.input.id === organization.id
  );

  if (!organization) return null;

  return {
    ...organization,
    zones: () =>
      zonesResolver(parent, { input: { ids: organization.zones } }, ctx, info),
  };
};

export const zoneResolver = async (
  parent: any,
  args: any,
  ctx: any,
  info: any
) => {
  if (!args.input) return null;

  if (!ctx.currentUser) throw new Error("No current user");

  if (!ctx.currentUser.isMemberOfZone(args.input.id)) return null;

  const zone = db.zones.find((zone) => args.input.id === zone.id);

  if (!zone) return null;

  return {
    ...zone,
    organization: () =>
      organizationResolver(
        parent,
        { input: { id: zone.organization } },
        ctx,
        info
      ),
  };
};
