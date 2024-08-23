export interface Ivote {
    sessionId: string;
    questionnaireId: string;
    optionsId: string;
}

export interface VoteInterfaceRepository {
    create(data: Ivote): Promise<Ivote>
}