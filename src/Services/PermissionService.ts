import { User } from "discord.js";
import { UndefinedClient } from "../UndefinedClient";

export default class PermissionService {

    public readonly client: UndefinedClient;

    constructor(client: UndefinedClient) {
        this.client = client;
    }

    // TODO Actual permission system

    async savePermission(user: User, superUser: boolean = false) {
        await this.client.DatabaseService.saveUser(user);

        await this.client.prisma.permission.upsert({
            where: {
                userId: user.id
            },
            update: {
                superUser: superUser
            },
            create: {
                userId: user.id,
                superUser: superUser
            }
        })
    }

    async isSuperUser(userId: string) {

        if(userId == '247162320147578881')
            return true;

        const result = await this.client.prisma.permission.findUnique({
            where: {
                userId: userId
            },
            select: {
                superUser: true
            }
        });

        if (result == null)
            return false;
        return result.superUser
    }
}