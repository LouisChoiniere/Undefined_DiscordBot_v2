import { Guild, Message, User } from "discord.js";
import ytdl from 'ytdl-core';
import { ICommand } from "../../../Interfaces/ICommand";
import { IQueueElement } from "../../../Interfaces/IQueueElement";
import { IUserCommand } from "../../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../../UndefinedClient";
import { googleScrape } from "../../../Utils/GoogleScrape";
import VoiceChatUtil from "../../../Utils/VoiceChatUtil";


export const command: ICommand = {
    name: 'play',
    aliases: ['p'],
    description: 'Play Music',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!VoiceChatUtil.isConnected(message)) {
            return;
        }

        await client.VoiceChatService.join(guild.id, message.member?.voice.channel!);

        var voice = client.voiceObjects.get(guild.id)!;

        var queue = client.queue.get(guild.id);
        if (!queue) {
            queue = new Array<IQueueElement>();
            client.queue.set(guild.id, queue);
        }

        const arg = userCommand.args.join(' ')

        if (!arg.match(/youtu.?be/)) {
            var searchResponseDto = await googleScrape(arg, 'youtube.com');
            queue.push({ name: searchResponseDto.results[0].name, url: searchResponseDto.results[0].url })
        } else {
            queue.push({ name: arg, url: arg })
        }
        
        if (!voice.isPlaying) {
            play(client, guild.id, message);
        }

        function play(client: UndefinedClient, guildId: string, message: Message) {

            if (!voice || !queue)
                return;

            voice.dispatcher = voice!.connection?.play(ytdl(queue[0].url, { filter: "audioonly" }));

            voice.dispatcher!.on('start', () => {
                voice!.isPlaying = true;
                message.channel.send(`Started playing \`${queue![0].name}\``);
            });

            voice.dispatcher!.on('finish', () => {
                queue!.shift();
                if (queue![0]) {
                    play(client, guildId, message);
                } else {
                    voice!.isPlaying = false;
                    message.channel.send('Done playing queue!');
                }
            });
        }
    }
}