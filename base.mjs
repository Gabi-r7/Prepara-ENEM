// import { GoogleGenAI } from "@google/genai";

let text = `Após o início da pandemia de Covid-19 as condições de trabalho vêm sofrendo uma precarização que aumenta a cada ano. A chamada "Uberização", por exemplo, é um fenômeno que está se tornando cada vez mais comum. Diante disso, é necessário encontrar algumas soluções que promovam o crescimento econômico e que ainda combatam a precarização das condições de trabalho na era da tecnologia, como o aumento de vagas de trabalho e a qualificação de profissionais. 
	Deste modo, constatam-se as amplas taxas de desemprego, sobretudo, nas regiões periféricas. Neste viés, são notáveis os impactos aos indivíduos, principalmente aqueles com menor nível de escolaridade, que acabam enfrentando diversos impecilhos para serem contratados, dificultando a ascensão econômica dos mesmos. Além disso, devido as dificuldades de inserção no mercado de trabalho e as poucas oportunidades, muitos desses indivíduos acabam aceitando vagas de trabalho precarizadas.
 	Vale ressaltar, ainda, a negligência do Estado, que fiscaliza de forma ineficiente as formas de trabalho no território nacional. Embora inúmeras leis trabalhistas tenham sido criadas e implementadas desde o governo de Getúlio Vargas, os relatos de trabalhos precarizados no Braisl ainda são muito comuns. Deste modo, soluções podem ser tomadas utilizando-se das tecnologias presentes no cotidiano da população para que seja possível o crescimento econômico no país, lutando contra a precarização das condições de trabalho.
 	Portanto, é necessário que medidas sejam tomadas com o intuito de coibir o problema discorrido. Ao Estado, caberia a ampliação de programas de emprego visando diminuir a taxa de desemprego no Brasil e ainda facilitando aos indivíduos de diversos meios econômicos o acesso ao mercado de trabalho. Além disso, é necessário que este processo seja feito junto à medidas de regulamentação das condições de trabalho, visando coibir a precarização destas. Desta forma, será possível promover o crescimento econômico e a diminuição da precarização das condições de trabalho no país.`;

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Dê notas para minha redação de acordo com as competências do enem, o tema é: 'Como promover o crescimento econômico e ainda lutar contra a precarização das condições de trabalho na era da tecnologia'" + text,
//   });
//   console.log(response);
// }

// main();

import { createPartFromUri, GoogleGenAI } from "@google/genai";
import {apiKey} from "./apiKey.js";

const ai = new GoogleGenAI({ apiKey: apiKey });

async function uploadRemotePDF(url, displayName) {
    const pdfBuffer = await fetch(url)
        .then((response) => response.arrayBuffer());

    const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    const file = await ai.files.upload({
        file: fileBlob,
        config: {
            displayName: displayName,
        },
    });

    // Wait for the file to be processed.
    let getFile = await ai.files.get({ name: file.name });
    while (getFile.state === 'PROCESSING') {
        getFile = await ai.files.get({ name: file.name });
        console.log(`current file status: ${getFile.state}`);
        console.log('File is still processing, retrying in 5 seconds');

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });
    }
    if (file.state === 'FAILED') {
        throw new Error('File processing failed.');
    }

    return file;
}

async function main() {
    const content = [
        'What is the difference between each of the main benchmarks between these two papers? Output these in a table.',
    ];

    let file1 = await uploadRemotePDF("https://download.inep.gov.br/educacao_basica/enem/downloads/2020/Situacoes_nota_zero.pdf", "PDF 1")
    if (file1.uri && file1.mimeType) {
        const fileContent = createPartFromUri(file1.uri, file1.mimeType);
        content.push(fileContent);
    }
    let file2 = await uploadRemotePDF("https://download.inep.gov.br/educacao_basica/enem/downloads/2020/Competencia_1.pdf", "PDF 2")
    if (file2.uri && file2.mimeType) {
        const fileContent = createPartFromUri(file2.uri, file2.mimeType);
        content.push(fileContent);
    }
    let file3 = await uploadRemotePDF("https://download.inep.gov.br/educacao_basica/enem/downloads/2020/Competencia_2.pdf", "PDF 3")
    if (file3.uri && file3.mimeType) {
        const fileContent = createPartFromUri(file3.uri, file3.mimeType);
        content.push(fileContent);
    }
    let file4 = await uploadRemotePDF("https://download.inep.gov.br/educacao_basica/enem/downloads/2020/Competencia_3.pdf", "PDF 4")
    if (file4.uri && file4.mimeType) {
        const fileContent = createPartFromUri(file4.uri, file4.mimeType);
        content.push(fileContent);
    }
    let file5 = await uploadRemotePDF("https://download.inep.gov.br/educacao_basica/enem/downloads/2020/Competencia_4.pdf", "PDF 5")
    if (file5.uri && file5.mimeType) {
        const fileContent = createPartFromUri(file5.uri, file5.mimeType);
        content.push(fileContent);
    }
    let file6 = await uploadRemotePDF("https://download.inep.gov.br/educacao_basica/enem/downloads/2020/Competencia_5.pdf", "PDF 6")
    if (file6.uri && file6.mimeType) {
        const fileContent = createPartFromUri(file6.uri, file6.mimeType);
        content.push(fileContent);
    }

    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: content,
    });

    console.log(response.text);
}

main();


const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  } = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");
const path = require("path");
const markdownFilePath = path.join(__dirname, "context.md");
let markdownText = "";

try {
  markdownText = fs.readFileSync(markdownFilePath, "utf-8");
  console.log("Markdown file successfully loaded.");
} catch (err) {
  console.error("Error reading markdown file:", err);
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemma-3-27b-it",
});

const generationConfig = {
  temperature: 0.6,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseModalities: [
  ],
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(markdownText + " o tema é: 'Como promover o crescimento econômico e ainda lutar contra a precarização das condições de trabalho na era da tecnologia'" + text);
  // TODO: Following code needs to be updated for client-side apps.
  const candidates = result.response.candidates;
  for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part = candidates[candidate_index].content.parts[part_index];
      if(part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  console.log(result.response.text());
}

run();