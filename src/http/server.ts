import fastify from 'fastify'
import { createQuestionnaire } from '../routes/createQuestionnaire.route';

const app = fastify();

app.register(createQuestionnaire);

app.listen({ port: 3000 }).then(() => {
    console.log('running')
})