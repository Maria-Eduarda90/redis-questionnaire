import { GetQuestionnaireInterfaceRepository, IGetQuestionnaire, IGetQuestionnaireData } from "../interfaces/getQuestionnaire.interface";
import { prisma } from "../prisma/config/PrismaClient.config";

export class GetQuestionnaireUseCase implements GetQuestionnaireInterfaceRepository {
    async getQuestionnaire({ questionnaireId }: IGetQuestionnaire): Promise<any> {
        try {
            const questionnaire = await prisma.questionnaire.findUnique({
                where: {
                    id: questionnaireId,
                }
            });

            return questionnaire;
        } catch (err) {
            throw err;
        }
    }
}