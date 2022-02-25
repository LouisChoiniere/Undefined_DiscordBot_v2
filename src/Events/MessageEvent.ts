import { Guild, Message, TextChannel, User } from "discord.js";
import { IEvent } from "../Interfaces/IEvent";
import { IFlag, IUserCommand } from "../Interfaces/IUserCommand";
import { UndefinedClient } from "../UndefinedClient";


export const event: IEvent = {
    name: 'messageCreate',
    run: async (client: UndefinedClient, message: Message) => {

        // prevent bot to take action from message of other bots
        if (message.author.bot) return;

        // only answer TextChannels
        if (!(message.channel instanceof TextChannel)) return;

        // check if message starts with bot prefix
        if (message.content.startsWith(process.env.PREFIX!)) {


            var userCommand : IUserCommand = getUserCommand(message);

            var guild = message.guild;
            if (!guild) {
                return;
            }

            var user = message.member?.user
            if (!user) {
                return;
            }

            var hrstart = process.hrtime()
            await client.commands.get(userCommand.command)?.run(client, guild, user, message, userCommand)
            var hrend = process.hrtime(hrstart)

            let execTime = Math.floor((hrend[0] * 1e9 + hrend[1]) / 1e6);
            saveToDb(guild, user, message.content, execTime);
        }

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

function getUserCommand(message: Message): IUserCommand {
    const command = message.content.slice(process.env.PREFIX!.length).trim().split(' ')[0];

    const args = message.content.slice(process.env.PREFIX!.length).trim().split(' ').slice(1);

    let flagsMatch = message.content.matchAll(/-(\w+) ([^\s]+)/g);
    let flags = Array<IFlag>();
    for (const match of flagsMatch) {
        flags.push({ flag: match[1], value: match[2] })
    }

    return { command: command, args: args, flags: flags };
}
