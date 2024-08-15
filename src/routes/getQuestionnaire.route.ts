import z from "zod";
import { FastifyInstance } from "fastify";
import { GetQuestionnaireUseCase } from "../usecases/getQuestionnaire.usecase";

export async function getQuestionnaire(app: FastifyInstance) {
    const useCase = new GetQuestionnaireUseCase();

    app.get('/questionnaire/:questionnaireId', async (request, reply) => {
        const getParams = z.object({
            questionnaireId: z.string().uuid(),
        });

        const { questionnaireId } = getParams.parse(request.params);

        try {

            const data = await useCase.getQuestionnaire({
                questionnaireId
            });

            return reply.send({ data });

        } catch (err) {
            reply.status(400).send(err);
        }
    })
}