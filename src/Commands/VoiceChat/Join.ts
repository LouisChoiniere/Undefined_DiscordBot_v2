import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";

export const command: ICommand = {
    name: 'join',
    description: 'Join voice channel',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        if (!client.VoiceChatService.isMemberConnected(message)) {
            return;
        }

        client.VoiceChatService.join(message.member?.voice.channel!, message.guild!)

        await message.react('👌');
    }
}