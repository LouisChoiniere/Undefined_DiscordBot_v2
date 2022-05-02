import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { UndefinedClient } from "../../../UndefinedClient";


export const command: ICommand = {
    name: 'skip',
    description: 'Skip current song',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        if (!client.VoiceChatService.isMemberConnected(message)) {
            return;
        }

        client.VoiceChatService.stopPlayback(message.guild!);

        await message.react('⏩');
    }
}