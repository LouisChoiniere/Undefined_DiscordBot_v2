import { Guild, Message, TextChannel, User } from "discord.js";
import { IEvent } from "../Interfaces/IEvent";
import { UndefinedClient } from "../UndefinedClient";


export const event: IEvent = {
    name: 'messageCreate',
    run: async (client: UndefinedClient, message: Message) => {

        if (!message.guild) return;
        if (message.author.bot) return;
        if (!(message.channel instanceof TextChannel)) return;
        if (!message.content.startsWith(process.env.PREFIX!)) return;


        let command = message.content.split(" ")[0].slice(process.env.PREFIX?.length);
        let params = message.content.split(" ").slice(1);


        var hrstart = process.hrtime()
        await client.commands.get(command)?.run(client, message, params);
        var hrend = process.hrtime(hrstart)


        let execTime = Math.floor((hrend[0] * 1e9 + hrend[1]) / 1e6);
        saveToDb(message.guild, message.member?.user!, message.content, execTime);


        async function saveToDb(guild: Guild, user: User, command: string, execTime: number) {
            await client.DatabaseService.saveUser(user);
            await client.DatabaseService.saveGuild(guild);
            await saveCommand(guild.id, user.id, message.content, execTime)
        }

        async function saveCommand(guildId: string, userId: string, command: string, execTime: number) {
            await client.prisma.commandHistory.create({
                data: {
                    guildId: guildId,
                    userId: userId,
                    command: command,
                    execTime: execTime
                }
            });
        }
    }
};