import { GoogleGenAI } from "@google/genai";
import * as fs from 'fs';
import { apiKey } from "./apiKey.js";

const ai = new GoogleGenAI({ apiKey: apiKey });

async function main() {
    const contents = [
        { text: "Sobre o que esse documento fala?" },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(fs.readFileSync("Situacoes_nota_zero.pdf")).toString("base64")
            }
        }
    ];

    const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents
    });
    console.log(response.text);
}

main();