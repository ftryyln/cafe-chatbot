import { getGeminiModel, SYSTEM_INSTRUCTION } from '../config/gemini.js';

export async function handleChat(req, res) {
    const { conversation } = req.body;

    try {
        const model = getGeminiModel();

        if (!Array.isArray(conversation)) {
            throw new Error('Messages must be an array');
        }

        // Prepend system instruction to the first message
        const contents = conversation.map((item, index) => ({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{
                text: index === 0
                    ? `${SYSTEM_INSTRUCTION}\n\n${item.content || item.text}`
                    : (item.content || item.text)
            }]
        }));

        const result = await model.generateContent({ contents });
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ result: text });
    } catch (e) {
        console.error("Error details:", e);
        res.status(500).json({ error: e.message });
    }
}
