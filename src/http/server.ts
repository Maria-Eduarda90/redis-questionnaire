import fastify from 'fastify'
import { z } from 'zod';
import { prisma } from '../prisma/config/PrismaClient.config';

const app = fastify();

app.post('/questionnaire', async (request, reply) => {
    const created = z.object({
        title: z.string(),
    });

    const { title } = created.parse(request.body);

    const questionnaire = await prisma.questionnaire.create({
        data: {
            title,
        }
    });

    return reply.status(201).send({ id: questionnaire.id });
})

app.listen({ port: 3000 }).then(() => {
    console.log('running')
})