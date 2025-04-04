import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY_1!,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const callAi = async () => {
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash",
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