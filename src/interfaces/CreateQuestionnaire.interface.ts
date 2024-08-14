export interface IOptions {
    title: string;
}

export interface IQuestionnaire {
    id: string;
}

export interface ICreateQuestionnaire {
    title: string;
    options: IOptions[];
}

export interface QuestionnaireInterfaceRepository {
    create(data: ICreateQuestionnaire): Promise<IQuestionnaire>;
}