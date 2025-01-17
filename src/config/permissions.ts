import { Role } from "@prisma/client";

type Permissions = {
    [key: string]: {
        [key: string]: string;
    }
}

export const permissions: Permissions = {
    basic: {
        create: "create",
        read: "read",
        update: "update",
        delete: "delete",
    }
}

const userPermissions = [permissions.basic.read];

const managerPermissions = [...userPermissions, permissions.basic.create, permissions.basic.update];
const adminPermissions = [...managerPermissions, permissions.basic.delete];

const permissionByRole = {
    [Role.USER]: userPermissions, 
    [Role.MANAGER]: managerPermissions, 
    [Role.ADMIN]: adminPermissions, 
}

export const getPermissionsByRoles = (roles: Role[]) => {
    const permissionSet = new Set<string>();
    roles.forEach((role) => {
        permissionByRole[role].forEach((permission) => {
            permissionSet.add(permission)
        })
    });
    const permissions = Array.from(permissionSet);
    if (permissions.length === 0) return;
    return permissions;
}