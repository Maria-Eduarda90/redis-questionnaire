import fastify from 'fastify'
import { createQuestionnaire } from '../routes/createQuestionnaire.route';
import { getQuestionnaire } from '../routes/getQuestionnaire.route';

const app = fastify();

app.register(createQuestionnaire);
app.register(getQuestionnaire);

app.listen({ port: 3000 }).then(() => {
    console.log('running')
})