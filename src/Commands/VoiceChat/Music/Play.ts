import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { IQueueElement } from "../../../Interfaces/IQueueElement";
import { UndefinedClient } from "../../../UndefinedClient";
import { getPage, googleScrape } from "../../../Utils/GoogleScrape";


export const command: ICommand = {
    name: 'play',
    aliases: ['p'],
    description: 'Play Music',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        if (!client.VoiceChatService.isMemberConnected(message)) {
            return;
        }

        // Join vc
        client.VoiceChatService.join(message.member?.voice.channel!, message.guild!);

        // Add to queue
        var queue = client.VoiceChatService.getQueue(message.guild!);
        await addToQueue(queue, params.join(' '), message.channelId);

        // Start audio playback
        client.VoiceChatService.startPlayback(message.guild!);


        async function addToQueue(queue: IQueueElement[], arg: string, channelId: string) {
            var queueElement;

            if (!arg) {
                client.VoiceChatService.resumePlayback(message.guild!);
            }

            // Youtube url
            else if (arg.match(/youtu.?be/)) {
                let match = arg.match(/\S*youtu.?be\S*/g)![0]  

                let title = (await getPage(match)).title;
                let url = match;

                queueElement = { name: title, url: url, location: channelId };
            }

            // Search on google
            else {
                var searchResponseDto = await googleScrape(arg, 'youtube.com');
                queueElement = { name: searchResponseDto.results[0].name, url: searchResponseDto.results[0].url, location: channelId };
            }

            // Add queue element to queue
            if (queueElement) {
                queue.push(queueElement);
                message.channel.send(`**${queueElement.name}** has been added to the queue.`);
            }
        }
    }
}