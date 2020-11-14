"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoneResolver = exports.organizationResolver = exports.zonesResolver = exports.organizationsResolver = void 0;
const db_json_1 = __importDefault(require("./db.json"));
////////////////////// DIRECT OBJECTS ///////////////////////////
exports.organizationsResolver = (parent, args, ctx, info) => {
    if (!args.input.ids)
        return [];
    if (!ctx.currentUser)
        throw new Error("No current user");
    const filtered = args.input.ids.filter((id) => {
        return ctx.currentUser.isMemberOfOrganization(id);
    });
    const orgs = db_json_1.default.organizations.filter((org) => filtered.includes(org.id));
    return orgs.map((org) => {
        return {
            id: org.id,
            name: org.name,
            zones: () => exports.zonesResolver(parent, { input: { ids: org.zones } }, ctx, info),
        };
    });
};
exports.zonesResolver = async (parent, args, ctx, info) => {
    if (!args.input)
        return [];
    if (!args.input.ids)
        return [];
    if (!ctx.currentUser)
        throw new Error("No current user");
    const filtered = args.input.ids.filter((id) => {
        return ctx.currentUser.isMemberOfZone(id);
    });
    const zones = db_json_1.default.zones.filter((zone) => filtered.includes(zone.id));
    return zones.map((zone) => {
        return {
            id: zone.id,
            name: zone.name,
            organization: () => exports.organizationResolver(parent, { input: { id: zone.organization } }, ctx, info),
        };
    });
};
exports.organizationResolver = async (parent, args, ctx, info) => {
    if (!args.input)
        return null;
    if (!ctx.currentUser)
        throw new Error("No current user");
    if (!ctx.currentUser.isMemberOfOrganization(args.input.id))
        return null;
    const organization = db_json_1.default.organizations.find((organization) => args.input.id === organization.id);
    if (!organization)
        return null;
    return {
        ...organization,
        zones: () => exports.zonesResolver(parent, { input: { ids: organization.zones } }, ctx, info),
    };
};
exports.zoneResolver = async (parent, args, ctx, info) => {
    if (!args.input)
        return null;
    if (!ctx.currentUser)
        throw new Error("No current user");
    if (!ctx.currentUser.isMemberOfZone(args.input.id))
        return null;
    const zone = db_json_1.default.zones.find((zone) => args.input.id === zone.id);
    if (!zone)
        return null;
    return {
        ...zone,
        organization: () => exports.organizationResolver(parent, { input: { id: zone.organization } }, ctx, info),
    };
};
//# sourceMappingURL=resolvers.js.map