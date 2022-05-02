import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'user',
    description: 'Get user info',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        var superUser = await client.PermissionService.isSuperUser(message.member!.user.id);
        if (!superUser)
            return;

        var userLookup = (await client.users.fetch(params[0])).toJSON()

        await message.channel.send(`\`\`\`json\n${JSON.stringify(userLookup, null, 2)}\`\`\``);
    }
}