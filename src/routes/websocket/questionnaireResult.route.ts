import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/pub.sub";

export async function questionnaireResult(app: FastifyInstance) {
    app.get('/questionnaire/:questionnaireId/results', { websocket: true }, (connection, request) => {
        try {
            const getParams = z.object({
                questionnaireId: z.string().uuid(),
            });

            const { questionnaireId } = getParams.parse(request.params);

            voting.subscribe(questionnaireId, (message) => {
                connection.socket.send(JSON.stringify(message));
            });
        } catch (err) {
            console.log('Error in websocket route: ', err);
        }
    })
}