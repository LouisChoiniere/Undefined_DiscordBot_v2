import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { IUserCommand } from "../../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../../UndefinedClient";
import VoiceChatUtil from "../../../Utils/VoiceChatUtil";


export const command: ICommand = {
    name: 'queue',
    description: 'Check the queue',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!VoiceChatUtil.isConnected(message)) {
            return;
        }

        var queue = client.queue.get(guild.id);
        if (!queue || queue.length == 0) {
            await message.channel.send('Queue is empty!');
            return;
        }

        var nowPlaying = `[${queue[0].name}](${queue[0].url})`;

        var upNext = ``;
        if (queue.length > 1) {
            for (var index = 1; index < queue.length; index++) {
                upNext += `${index}: [${queue[index].name}](${queue[index].url})\n`;
                if (index >= 15) break;
            }
        } else {
            upNext = `No songs in the queue!`;
        }

        var embed = new MessageEmbed({
            title: ':musical_note: Queue',
            color: 1343810,
            fields: [{
                name: "Now playing",
                value: nowPlaying
            }, {
                name: "Up next",
                value: upNext
            }]
        });

        await message.channel.send(embed);
    }
}