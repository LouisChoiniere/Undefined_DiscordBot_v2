import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { IUserCommand } from "../../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../../UndefinedClient";
import VoiceChatUtil from "../../../Utils/VoiceChatUtil";

export const command: ICommand = {
    name: 'ff',
    description: 'Fast forward',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!VoiceChatUtil.isConnected(message)) {
            return;
        }

        var voice = client.voiceObjects.get(guild.id);

        if (!voice)
            return;

        // voice.dispatcher?.

        // await message.react('');
    }
}