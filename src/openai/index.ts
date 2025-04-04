import OpenAI from "openai";

class GeminiKeyManager {
    private keys: string[];
    private currentIndex: number = 0;

    constructor() {
        this.keys = [
            process.env.GEMINI_API_KEY_1 || '',
            process.env.GEMINI_API_KEY_2 || ''
        ];

        if (this.keys.some(key => !key)) {
            throw new Error('Missing one or both Gemini API keys');
        }
    }

    getNextKey(): string {
        const key = this.keys[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.keys.length;
        return key;
    }

    getOpenAIInstance(): OpenAI {
        return new OpenAI({
            apiKey: this.getNextKey(),
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
        });
    }
}

const keyManager = new GeminiKeyManager();

export const callAi = async () => {
    const openai = keyManager.getOpenAIInstance();

    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash-lite",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: "Explain to me how AI works",
            },
        ],
    });
    
    console.log(response.choices[0].message);
}
