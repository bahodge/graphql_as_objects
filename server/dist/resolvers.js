"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneResolver = exports.organizationResolver = exports.zonesResolver = exports.organizationsResolver = void 0;
const db_json_1 = __importDefault(require("./db.json"));
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
exports.organizationsResolver = (parent, args, ctx, info) => {
    let orgs = db_json_1.default.organizations;
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
            zones: () => exports.zonesResolver(parent, args || { input: { ids: [org.zones] } }, ctx, info),
        };
    });
};
exports.zonesResolver = async (parent, args, ctx, info) => {
    let zones = db_json_1.default.zones;
    if (!args.input)
        return [];
    if (args.input.ids) {
        zones = zones.filter((zone) => args.input.ids.includes(zone.id));
    }
    return zones.map((zone) => {
        return {
            id: zone.id,
            name: zone.name,
            organization: () => exports.organizationResolver(parent, { input: { id: zone.organization } }, ctx, info),
        };
    });
};
exports.organizationResolver = async (_parent, args, _ctx, _info) => {
    let organizations = db_json_1.default.organizations;
    if (!args.input)
        return null;
    const organization = organizations.find((org) => org.id === args.input.id);
    if (!organization)
        return null;
    return {
        ...organization,
        zones: () => exports.zonesResolver(_parent, { input: { ids: organization.zones } }, _ctx, _info),
    };
};
exports.zoneResolver = async (_parent, args, _ctx, _info) => {
    let zones = db_json_1.default.zones;
    if (!args.input)
        return null;
    const zone = zones.find((zone) => zone.id === args.input.id);
    if (!zone)
        return null;
    return {
        ...zone,
        organization: () => exports.organizationResolver(_parent, { input: { id: zone.organization } }, _ctx, _info),
    };
};
//# sourceMappingURL=resolvers.js.map