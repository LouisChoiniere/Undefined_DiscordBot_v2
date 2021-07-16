import { ICommand } from "../../Interfaces/ICommand"
import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { UndefinedClient } from "../../UndefinedClient";
import { IUserCommand } from "../../Interfaces/IUserCommand";

export const command: ICommand = {
    name: 'user',
    description: 'Get user info',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        var superUser = await client.PermissionService.isSuperUser(message.member!.user.id);
        if (!superUser)
            return;

        var userLookup = (await client.users.fetch(userCommand.args[0])).toJSON()

        await message.channel.send(`\`\`\`json\n${JSON.stringify(userLookup, null, 4)}\`\`\``);
    }
}