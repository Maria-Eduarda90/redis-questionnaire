import { randomUUID } from "node:crypto";
import { FastifyInstance } from "fastify";
import z from "zod";
import { CreateVoteUseCase } from "../usecases/voteQuestionnaire.usecase";

export async function voteOnQuestionnaire(app: FastifyInstance) {
    const useCase = new CreateVoteUseCase();
    app.post('/questionnaire/:questionnaireId/vote', async (request, reply) => {
        const voteOnQuestionnaireBody = z.object({
            optionsId: z.string().uuid(),
        });

        const voteOnQuestionnaireParams = z.object({
            questionnaireId: z.string().uuid(),
        });

        const { questionnaireId } = voteOnQuestionnaireParams.parse(request.params);
        const { optionsId } = voteOnQuestionnaireBody.parse(request.body);

        let { sessionId } = request.cookies;

        if (!sessionId) {
            sessionId = randomUUID();

            reply.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true,
            })
        };

        try {
            await useCase.create({
                sessionId,
                questionnaireId,
                optionsId
            });

            return reply.status(201).send();
        } catch (err) {
            reply.status(400).send(err);
        }
    })
}