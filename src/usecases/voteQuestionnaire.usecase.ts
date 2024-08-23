import { VoteInterfaceRepository } from './../interfaces/VoteQuestionnaire.interface';
import { Ivote } from "../interfaces/VoteQuestionnaire.interface";
import { prisma } from "../prisma/config/PrismaClient.config";

export class CreateVoteUseCase implements VoteInterfaceRepository {
    async create({ sessionId, questionnaireId, optionsId }: Ivote): Promise<Ivote> {
        try {
            if (sessionId) {
                const userVote = await prisma.vote.findUnique({
                    where: {
                        sessionId_questionnaireId: {
                            sessionId,
                            questionnaireId
                        }
                    }
                });

                if (userVote && userVote.optionsId !== optionsId) {
                    await prisma.vote.delete({
                        where: {
                            id: userVote.id
                        }
                    });
                } else if (userVote){
                    throw new Error('voce já votou nesse questionario').message;
                }

                const questionnaireExists = await prisma.questionnaire.findUnique({
                    where: { id: questionnaireId },
                });

                if (!questionnaireExists) {
                    throw new Error('Questionário não encontrado');
                }

                const optionExists = await prisma.options.findUnique({
                    where: { id: optionsId },
                });

                if (!optionExists) {
                    throw new Error('Opção não encontrada');
                }
            }

            const created = await prisma.vote.create({
                data: {
                    sessionId,
                    questionnaireId,
                    optionsId
                }
            });

            return created;
        } catch (err) {
            throw err;
        }
    }
}