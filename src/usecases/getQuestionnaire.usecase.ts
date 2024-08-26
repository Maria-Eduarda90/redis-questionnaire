import { GetQuestionnaireInterfaceRepository, IGetQuestionnaire } from "../interfaces/getQuestionnaire.interface";
import { prisma } from "../libs/prisma/config/PrismaClient.config";
import { redis } from "../libs/redis/redis";

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

            if (!questionnaire) {
                throw new Error('Questionario não encontrado').message;
            }

            const result = await redis.zrange(questionnaireId, 0, -1, 'WITHSCORES');

            const votes = result.reduce((obj, line, index) => {
                if (index % 2 === 0) {
                    const score = result[index + 1];
                    Object.assign(obj, { [line]: Number(score) });
                }

                return obj;
            }, {} as Record<string, number>);

            return {
                questionnaire: {
                    id: questionnaire.id,
                    title: questionnaire.title,
                    options: questionnaire.options.map(option => {
                        return {
                            id: option.id,
                            title: option.title,
                            score: (option.id in votes) ? votes[option.id] : 0
                        }
                    })
                }
            };
        } catch (err) {
            throw err;
        }
    }
}