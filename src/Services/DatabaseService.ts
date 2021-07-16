import { Guild, User } from "discord.js";
import { UndefinedClient } from "../UndefinedClient";

export default class DatabaseService {

    public readonly client: UndefinedClient;

    constructor (client: UndefinedClient) {
        this.client = client;
    }

    async saveGuild(guild: Guild) {
        let owner = await this.client.users.fetch(guild.ownerID)!;
        await this.saveUser(owner);

        await this.client.prisma.guild.upsert({
            where: {
                id: guild.id
            },
            update: {
                name: guild.name,
                memberCount: guild.memberCount,
                ownerID: guild.ownerID
            },
            create: {
                id: guild.id,
                name: guild.name,
                memberCount: guild.memberCount,
                ownerID: guild.ownerID
            }
        });
    }

    async saveUser(user: User) {
        await this.client.prisma.user.upsert({
            where: {
                id: user.id
            },
            update: {
                username: user.username,
                discriminator: user.discriminator
            },
            create: {
                id: user.id,
                username: user.username,
                discriminator: user.discriminator
            }
        });
    }
}