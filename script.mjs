// import { createPartFromUri, GoogleGenAI } from "@google/genai";
// import fs from "fs";
// import mime from "mime-types";
// import path from "path";
// import apiKey from "./apiKey.js";

// const ai = new GoogleGenAI({ apiKey: apiKey });

// async function uploadRemotePDF(url, displayName) {
//     const pdfBuffer = await fetch(url).then((response) => response.arrayBuffer());
//     const fileBlob = new Blob([pdfBuffer], { type: "application/pdf" });

//     const file = await ai.files.upload({
//         file: fileBlob,
//         config: {
//             displayName: displayName,
//         },
//     });

//     // Wait for the file to be processed.
//     let getFile = await ai.files.get({ name: file.name });
//     while (getFile.state === "PROCESSING") {
//         getFile = await ai.files.get({ name: file.name });
//         console.log(`current file status: ${getFile.state}`);
//         console.log("File is still processing, retrying in 5 seconds");

//         await new Promise((resolve) => {
//             setTimeout(resolve, 5000);
//         });
//     }
//     if (file.state === "FAILED") {
//         throw new Error("File processing failed.");
//     }

//     return file;
// }

// async function main() {
//     const content = ["Use o seguinte contexto para corrigir o texto abaixo de acordo com as competências do ENEM:"];

//     // URLs dos PDFs
//     const pdfUrls = [
//         "C:\IFC_2025\PPO\Prepara-ENEM\Situacoes_nota_zero.pdf",
//         "C:\IFC_2025\PPO\Prepara-ENEM\Competencia_1.pdf",
//         "C:\IFC_2025\PPO\Prepara-ENEM\Competencia_2.pdf",
//         "C:\IFC_2025\PPO\Prepara-ENEM\Competencia_3.pdf",
//         "C:\IFC_2025\PPO\Prepara-ENEM\Competencia_4.pdf",
//         "C:\IFC_2025\PPO\Prepara-ENEM\Competencia_5.pdf",
//     ];

//     // Processa cada PDF e adiciona ao contexto
//     for (let i = 0; i < pdfUrls.length; i++) {
//         const file = await uploadRemotePDF(pdfUrls[i], `PDF ${i + 1}`);
//         if (file.uri && file.mimeType) {
//             const fileContent = createPartFromUri(file.uri, file.mimeType);
//             content.push(fileContent);
//         }
//     }

//     // Texto a ser corrigido
//     const text = `Após o início da pandemia de Covid-19 as condições de trabalho vêm sofrendo uma precarização que aumenta a cada ano. A chamada "Uberização", por exemplo, é um fenômeno que está se tornando cada vez mais comum. Diante disso, é necessário encontrar algumas soluções que promovam o crescimento econômico e que ainda combatam a precarização das condições de trabalho na era da tecnologia, como o aumento de vagas de trabalho e a qualificação de profissionais. 
//     Deste modo, constatam-se as amplas taxas de desemprego, sobretudo, nas regiões periféricas. Neste viés, são notáveis os impactos aos indivíduos, principalmente aqueles com menor nível de escolaridade, que acabam enfrentando diversos impecilhos para serem contratados, dificultando a ascensão econômica dos mesmos. Além disso, devido as dificuldades de inserção no mercado de trabalho e as poucas oportunidades, muitos desses indivíduos acabam aceitando vagas de trabalho precarizadas.
//     Vale ressaltar, ainda, a negligência do Estado, que fiscaliza de forma ineficiente as formas de trabalho no território nacional. Embora inúmeras leis trabalhistas tenham sido criadas e implementadas desde o governo de Getúlio Vargas, os relatos de trabalhos precarizados no Brasil ainda são muito comuns. Deste modo, soluções podem ser tomadas utilizando-se das tecnologias presentes no cotidiano da população para que seja possível o crescimento econômico no país, lutando contra a precarização das condições de trabalho.
//     Portanto, é necessário que medidas sejam tomadas com o intuito de coibir o problema discorrido. Ao Estado, caberia a ampliação de programas de emprego visando diminuir a taxa de desemprego no Brasil e ainda facilitando aos indivíduos de diversos meios econômicos o acesso ao mercado de trabalho. Além disso, é necessário que este processo seja feito junto à medidas de regulamentação das condições de trabalho, visando coibir a precarização destas. Desta forma, será possível promover o crescimento econômico e a diminuição da precarização das condições de trabalho no país.`;

//     content.push(`Agora, corrija o seguinte texto:\n${text}`);

//     // Envia o contexto e o texto para a API
//     const response = await ai.models.generateContent({
//         model: "gemini-1.5-flash",
//         contents: content,
//     });

//     console.log(response.text);
// }

// main();

// Adicione fs.promises e path aos imports
import { promises as fs } from "fs"; // Usar a versão baseada em Promises
import path from "path";
import mime from "mime-types"; // Você já tinha este
import { createPartFromUri, GoogleGenAI } from "@google/genai";
import apiKey from "./apiKey.js";

// Certifique-se de ter o mime-types instalado: npm install mime-types
// Se ainda não tiver, rode: npm install @google/genai mime-types

const ai = new GoogleGenAI({ apiKey: apiKey });

// --- Função uploadLocalPDF CORRIGIDA ---
async function uploadLocalPDF(filePath, displayName) {
    console.log(`Reading local file: ${filePath}`);
    try {
        const fileBuffer = await fs.readFile(filePath);
        console.log(`Successfully read ${filePath}, size: ${fileBuffer.byteLength}`);

        const mimeType = mime.lookup(filePath);
        if (!mimeType) {
            throw new Error(`Could not determine MIME type for ${filePath}`);
        }
        console.log(`Determined MIME type: ${mimeType}`);

        const fileBlob = new Blob([fileBuffer], { type: mimeType });

        console.log(`Uploading file blob for ${displayName}...`);
        // *** CORREÇÃO AQUI ***
        // ai.files.upload() retorna o objeto do arquivo diretamente.
        const uploadedFile = await ai.files.upload({ // Renomeei para 'uploadedFile' para clareza
            file: fileBlob,
            config: {
                displayName: displayName,
            },
        });

        // Adicionar uma verificação para garantir que o upload retornou algo esperado
        if (!uploadedFile || !uploadedFile.name) {
             console.error("Upload failed or API response structure is unexpected:", uploadedFile);
             throw new Error(`File upload did not return a valid file object for ${displayName}.`);
        }

        // Use 'uploadedFile' diretamente (que contém 'name' e 'state')
        console.log(`File upload initiated: ${uploadedFile.name}, state: ${uploadedFile.state}`);

        // 5. Esperar o processamento (usando o nome correto)
        let processedFile = await ai.files.get({ name: uploadedFile.name }); // << Usa uploadedFile.name
        while (processedFile.state === "PROCESSING") {
            console.log(`Current file status for ${displayName}: ${processedFile.state}. Retrying in 5 seconds...`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
            processedFile = await ai.files.get({ name: uploadedFile.name }); // << Usa uploadedFile.name
        }

        console.log(`Final file status for ${displayName}: ${processedFile.state}`);
        if (processedFile.state === "FAILED") {
            const errorDetails = processedFile.error ? JSON.stringify(processedFile.error) : 'Unknown error';
            throw new Error(`File processing failed for ${displayName}. Details: ${errorDetails}`);
        }
        if (processedFile.state !== "ACTIVE") {
            throw new Error(`File ${displayName} is not active after processing. Final state: ${processedFile.state}`);
        }

        return processedFile;

    } catch (error) {
        console.error(`Error processing local file ${filePath} (${displayName}):`, error);
        throw error;
    }
}

// --- Função main (sem alterações, mas certifique-se que chama uploadLocalPDF) ---
async function main() {
    try {
        const content = [
             { text: "Use o seguinte contexto para corrigir o texto abaixo de acordo com as competências do ENEM:" }
        ];

        // Seus caminhos locais (verifique se estão corretos)
        const localPdfPaths = [
             "Situacoes_nota_zero.pdf", // Verifique estes caminhos!
             "Competencia_1.pdf",
             "Competencia_2.pdf",
             "Competencia_3.pdf",
             "Competencia_4.pdf",
             "Competencia_5.pdf",
        ];

        // Processa cada PDF local e adiciona ao contexto
        for (let i = 0; i < localPdfPaths.length; i++) {
            const filePath = localPdfPaths[i];
            const displayName = path.basename(filePath);
            console.log(`--- Processing local file ${i + 1}: ${displayName} ---`);

            // Chama a função de upload local (já estava correto aqui)
            const file = await uploadLocalPDF(filePath, displayName); // << Chamada CORRETA

            if (file && file.uri && file.mimeType) {
                console.log(`Adding file ${file.name} (${file.displayName}) with URI ${file.uri} to context.`);
                const fileContent = createPartFromUri(file.uri, file.mimeType);
                content.push(fileContent);
            } else {
                console.warn(`Skipping file ${displayName} due to missing URI or mimeType after upload.`);
            }
        }

        // Texto a ser corrigido
        const text = `Após o início da pandemia de Covid-19 as condições de trabalho vêm sofrendo uma precarização que aumenta a cada ano. A chamada "Uberização", por exemplo, é um fenômeno que está se tornando cada vez mais comum. Diante disso, é necessário encontrar algumas soluções que promovam o crescimento econômico e que ainda combatam a precarização das condições de trabalho na era da tecnologia, como o aumento de vagas de trabalho e a qualificação de profissionais.
        Deste modo, constatam-se as amplas taxas de desemprego, sobretudo, nas regiões periféricas. Neste viés, são notáveis os impactos aos indivíduos, principalmente aqueles com menor nível de escolaridade, que acabam enfrentando diversos impecilhos para serem contratados, dificultando a ascensão econômica dos mesmos. Além disso, devido as dificuldades de inserção no mercado de trabalho e as poucas oportunidades, muitos desses indivíduos acabam aceitando vagas de trabalho precarizadas.
        Vale ressaltar, ainda, a negligência do Estado, que fiscaliza de forma ineficiente as formas de trabalho no território nacional. Embora inúmeras leis trabalhistas tenham sido criadas e implementadas desde o governo de Getúlio Vargas, os relatos de trabalhos precarizados no Brasil ainda são muito comuns. Deste modo, soluções podem ser tomadas utilizando-se das tecnologias presentes no cotidiano da população para que seja possível o crescimento econômico no país, lutando contra a precarização das condições de trabalho.
        Portanto, é necessário que medidas sejam tomadas com o intuito de coibir o problema discorrido. Ao Estado, caberia a ampliação de programas de emprego visando diminuir a taxa de desemprego no Brasil e ainda facilitando aos indivíduos de diversos meios econômicos o acesso ao mercado de trabalho. Além disso, é necessário que este processo seja feito junto à medidas de regulamentação das condições de trabalho, visando coibir a precarização destas. Desta forma, será possível promover o crescimento econômico e a diminuição da precarização das condições de trabalho no país.`; // Coloque seu texto aqui

        content.push({ text: `Agora, dê notas para o seguinte texto:\n${text}` });

        console.log("Generating content with Gemini...");
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const requestPayload = [{ role: "user", parts: content }];
        const result = await model.generateContent({ contents: requestPayload });
        const response = result.response;

        console.log("\n--- Resposta da IA ---");
        // Adicionar verificação se a resposta ou o texto existem
        if (response && response.text) {
            console.log(response.text());
        } else {
            console.log("A IA não retornou um texto na resposta.");
            console.log("Resposta completa:", JSON.stringify(result, null, 2)); // Logar a resposta completa para depuração
        }

    } catch (error) {
        console.error("\n--- Erro fatal na execução do script: ---", error);
        if (error.code === 'ENOENT') {
             console.error(`Erro: Arquivo não encontrado. Verifique o caminho: ${error.path}`);
        }
    }
}

main();