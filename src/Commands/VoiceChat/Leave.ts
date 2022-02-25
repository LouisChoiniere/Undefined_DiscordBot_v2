import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { IUserCommand } from "../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'leave',
    description: 'Leave voice chanel',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        client.VoiceChatService.leave(guild);

        await message.react('👋');

        // Clear queue
        client.VoiceChatService.deleteQueue(guild);
    }
}