import { AudioPlayer, AudioPlayerStatus, createAudioPlayer, createAudioResource, getVoiceConnection, joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import { Collection, Guild, Message, VoiceBasedChannel } from "discord.js";
import ytdl from "ytdl-core";
import { IQueueElement } from "../Interfaces/IQueueElement";
import { UndefinedClient } from "../UndefinedClient";

export default class VoiceChatService {

    private readonly client: UndefinedClient;

    private readonly queues: Collection<string, Array<IQueueElement>> = new Collection();
    private readonly audioPlayers: Collection<string, AudioPlayer> = new Collection();

    constructor(client: UndefinedClient) {
        this.client = client;
    }

    /**
     * Joins a voice channel
     * @param channel VoiceBasedChannel to join
     * @param guild Guild where the voice channel is located
     * @returns 
     */
    join(channel: VoiceBasedChannel, guild: Guild): VoiceConnection {
        return joinVoiceChannel({
            channelId: channel.id!,
            guildId: guild.id!,
            adapterCreator: guild.voiceAdapterCreator!,
        });
    }

    /**
     * leave a voice channel
     * @param guild Guild where the voice channel is located
     * @returns 
     */
    leave(guild: Guild) {
        this.audioPlayers.delete(guild.id);
        getVoiceConnection(guild.id)?.destroy();
    }

    /**
     * Check if memeber is connected to a voice channel in this server
     * @param message message that the user sent
     * @returns boolean whether the user is conneced or not
     */
    isMemberConnected(message: Message): boolean {
        if (!message.member?.voice.channel) {
            message.channel.send('You must be connected to a voice channel to use the bot!');
            return false;
        }

        return true;
    }

    /**
     * Get the queue of a specific guild
     * @param guild Guild of the queue
     * @returns Array of queue elements
     */
    getQueue(guild: Guild): IQueueElement[] {
        let queue = this.queues.get(guild.id);

        if (!queue) {
            queue = new Array<IQueueElement>();
            this.queues.set(guild.id, queue);
        }

        return queue;
    }

    /**
     * Set the queue of a specific guild
     * @param guild Guild of the queue
     * @param newQueue Array of queue elements
     * @returns 
     */
    setQueue(guild: Guild, newQueue: IQueueElement[]) {
        if (newQueue != undefined) return;

        this.queues.set(guild.id, newQueue);
    }

    /**
     * Delete the queue of a specific guild
     * @param guild Guild of the queue
     * @returns success of deletion
     */
    deleteQueue(guild: Guild): boolean {
        return this.queues.delete(guild.id);
    }

    startPlayback(guild: Guild) {
        let audioPlayer = this.audioPlayers.get(guild.id);

        // If audioplayer does not exist
        if (audioPlayer == undefined) {
            audioPlayer = createAudioPlayer()
            this.audioPlayers.set(guild.id, audioPlayer);

            const voiceConnection = getVoiceConnection(guild.id)
            voiceConnection?.subscribe(audioPlayer);

            let queue = this.getQueue(guild);

            this.playAudioResource(audioPlayer, queue[0]);

            audioPlayer.on(AudioPlayerStatus.Idle, () => {

                // Check if there is a item next in queue
                if (queue[1] != undefined) {
                    queue.shift();
                    this.playAudioResource(audioPlayer, queue[0])
                }

                // Queue is empty
                else {
                    if (queue[0].location) {
                        this.client.send(queue[0].location, 'Queue is empty')
                    }
                    queue.shift();
                }


            });
        }

        this.resumePlayback(guild);
    }

    pausePlayback(guild: Guild) {
        this.audioPlayers.get(guild.id)?.pause();
    }

    resumePlayback(guild: Guild) {
        this.audioPlayers.get(guild.id)?.unpause();
    }

    stopPlayback(guild: Guild) {
        this.audioPlayers.get(guild.id)?.stop();
    }

    private playAudioResource(audioPlayer: AudioPlayer | undefined, queueElement: IQueueElement) {

        let audioRessource = createAudioResource(ytdl(queueElement.url, { filter: 'audioonly' }));
        audioPlayer?.play(audioRessource)

        if (queueElement.location) {
            this.client.send(queueElement.location, `Started playing **${queueElement.name}**`)
        }
    }
}