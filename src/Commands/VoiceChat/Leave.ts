import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'leave',
    description: 'Leave voice chanel',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        client.VoiceChatService.leave(message.guild!);

        await message.react('👋');

        // Clear queue
        client.VoiceChatService.deleteQueue(message.guild!);
    }
}