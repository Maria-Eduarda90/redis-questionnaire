import { GetQuestionnaireInterfaceRepository, IGetQuestionnaire } from "../interfaces/getQuestionnaire.interface";
import { prisma } from "../prisma/config/PrismaClient.config";

export class GetQuestionnaireUseCase implements GetQuestionnaireInterfaceRepository {
    async getQuestionnaire({ questionnaireId }: IGetQuestionnaire): Promise<any> {
        try {
            const questionnaire = await prisma.questionnaire.findUnique({
                where: {
                    id: questionnaireId,
                },
                include: {
                    options: {
                        select: {
                            id: true,
                            title: true
                        }
                    }
                }
            });

            return questionnaire;
        } catch (err) {
            throw err;
        }
    }
}