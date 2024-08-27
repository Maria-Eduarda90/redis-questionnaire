import { Message, Subscriber } from "../@types/Subscriber";

export class VotingPubSub {
    private channels: Record<string, Subscriber[]> = {};

    subscribe(questionnaireId: string, subscriber: Subscriber) {
        if (!this.channels[questionnaireId]) {
            this.channels[questionnaireId] = [];
        }

        this.channels[questionnaireId].push(subscriber);
    }

    publish(questionnaireId: string, message: Message) {
        if (!this.channels[questionnaireId]) {
            return;
        }

        for (const subscriber of this.channels[questionnaireId]) {
            subscriber(message);
        }
    }
}

export const voting = new VotingPubSub();