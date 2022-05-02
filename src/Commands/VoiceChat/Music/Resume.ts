import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { UndefinedClient } from "../../../UndefinedClient";

export const command: ICommand = {
    name: 'resume',
    description: 'Resume Music',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        if (!client.VoiceChatService.isMemberConnected(message)) {
            return;
        }

        client.VoiceChatService.resumePlayback(message.guild!);

        await message.react('▶');
    }
}