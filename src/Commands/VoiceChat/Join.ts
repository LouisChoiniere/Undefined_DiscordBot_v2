import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { IUserCommand } from "../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'join',
    description: 'Join voice channel',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!client.VoiceChatService.isMemberConnected(message)) {
            return;
        }

        client.VoiceChatService.join(message.member?.voice.channel!, guild)

        await message.react('👌');
    }
}