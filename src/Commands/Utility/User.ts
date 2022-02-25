import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { IUserCommand } from "../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'user',
    description: 'Get user info',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        var superUser = await client.PermissionService.isSuperUser(message.member!.user.id);
        if (!superUser)
            return;

        var userLookup = (await client.users.fetch(userCommand.args[0])).toJSON()

        await message.channel.send(`\`\`\`json\n${JSON.stringify(userLookup, null, 2)}\`\`\``);
    }
}