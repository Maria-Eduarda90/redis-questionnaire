export interface DataQuestionnaire {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGetQuestionnaireData {
    data: DataQuestionnaire;
}

export interface IGetQuestionnaire {
    questionnaireId: string;
}

export interface GetQuestionnaireInterfaceRepository {
    getQuestionnaire(questionnaireId: IGetQuestionnaire): Promise<IGetQuestionnaireData>;
}