"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(rawUser) {
        this.name = rawUser.name || "";
        this.id = rawUser.id;
        this.organizationMemberships = rawUser.organizationMemberships;
    }
    isMemberOfOrganization(id) {
        return this.organizationMemberships.some((orgMembership) => {
            return orgMembership.organization.id === id;
        });
    }
    isMemberOfZone(id) {
        return this.organizationMemberships.some((orgMembership) => {
            return orgMembership.zoneMemberships.some((zoneMembership) => zoneMembership.zone.id === id);
        });
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map