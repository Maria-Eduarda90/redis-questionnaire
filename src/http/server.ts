import fastify from 'fastify'

const app = fastify();

app.get('/hello', () => {
    return 'teste';
})

app.listen({ port: 3000 }).then(() => {
    console.log('running')
})