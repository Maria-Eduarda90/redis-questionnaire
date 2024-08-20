import fastify from 'fastify'
import cookie from '@fastify/cookie';
import { createQuestionnaire } from '../routes/createQuestionnaire.route';
import { getQuestionnaire } from '../routes/getQuestionnaire.route';
import { voteOnQuestionnaire } from '../routes/voteQuestionnaire.route';

const app = fastify();

app.register(cookie, {
    secret: "meyh-mary-secret",
    hook: "onRequest"
});

app.register(createQuestionnaire);
app.register(getQuestionnaire);
app.register(voteOnQuestionnaire);

app.listen({ port: 3000 }).then(() => {
    console.log('running')
})