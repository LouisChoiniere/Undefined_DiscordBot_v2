import { ICommand } from "../../Interfaces/ICommand"
import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'permission',
    description: '',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        // var superUser = await client.PermissionService.isSuperUser(message.member!.user.id);
        // if (!superUser)
        //     return;

        // var userPermDest = await client.users.fetch(userCommand.args[0]);

        // if (!userPermDest)
        //     return;

        // await client.PermissionService.savePermission(userPermDest, userCommand.args[1] === 'true')
    }
}