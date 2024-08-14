import z from "zod";
import { FastifyInstance } from "fastify";
import { CreateQuestionnaireUseCase } from "../usecases/createQuestionnaire.usecase";

export async function createQuestionnaire(app: FastifyInstance) {
    const useCase = new CreateQuestionnaireUseCase();

    app.post('/questionnaire', async (request, reply) => {
        const created = z.object({
            title: z.string(),
            options: z.array(z.string()),
        });

        const { title, options } = created.parse(request.body);

        try {

            const optionsMapped = options.map(option => ({ title: option }))

            const data = await useCase.create({
                title,
                options: optionsMapped
            });

            return reply.status(201).send({ id: data.id });

        } catch (err) {
            reply.status(400).send(err);
        }
    })
}