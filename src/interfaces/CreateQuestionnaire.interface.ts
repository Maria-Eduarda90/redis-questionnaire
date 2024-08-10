export interface IQuestionnaire {
    id: string;
}

export interface ICreateQuestionnaire {
    title: string;
}

export interface QuestionnaireInterfaceRepository {
    create(data: ICreateQuestionnaire): Promise<IQuestionnaire>;
}