"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zonesResolver = exports.organizationsResolver = void 0;
const db_json_1 = __importDefault(require("./db.json"));
exports.organizationsResolver = (parent, args, ctx, info) => {
    let orgs = db_json_1.default.organizations;
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
            zones: () => exports.zonesResolver(parent, { ids: [org.zones] }, ctx, info),
        };
    });
};
exports.zonesResolver = async (parent, args, ctx, info) => {
    let zones = db_json_1.default.zones;
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
            organization: () => exports.organizationsResolver(parent, { id: zone.organization.id }, ctx, info)[0],
        };
    });
};
//# sourceMappingURL=resolvers.js.map