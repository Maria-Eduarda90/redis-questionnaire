import { ICreateQuestionnaire, IQuestionnaire, QuestionnaireInterfaceRepository } from "../interfaces/CreateQuestionnaire.interface";
import { prisma } from "../prisma/config/PrismaClient.config";

export class CreateQuestionnaireUseCase implements QuestionnaireInterfaceRepository {
    async create({ title, options }: ICreateQuestionnaire): Promise<IQuestionnaire> {
        try {
            const created = await prisma.questionnaire.create({
                data: {
                    title,
                    options: {
                        createMany: {
                            data: options.map(option => {
                                return { title: option.title }
                            })
                        }
                    }
                }
            })

            return { id: created.id };
        } catch (err) {
            throw err;
        }
    }
}