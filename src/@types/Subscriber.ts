export type Message = { optionsId: string, votes: number };
export type Subscriber = (message: Message) => void;