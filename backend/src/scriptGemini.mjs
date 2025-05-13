import { promises as fs } from "fs"; // Usar a versão baseada em Promises
import path from "path";
import mime from "mime-types"; // Você já tinha este
import { createPartFromUri, GoogleGenAI } from "@google/genai";
import { apiKey } from "../../apiKey.js";
import { fileURLToPath } from 'url';

// Substituir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
            await new Promise((resolve) => setTimeout(resolve, 25000));
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

export async function processEssay(theme, text) {
    console.log('text: ', text);
    console.log('theme: ', theme);
    try {
        const content = [
             { text: "Use o seguinte contexto para avaliar o texto abaixo de acordo com as competências do ENEM, o tema é:", theme }
        ];

        // Seus caminhos locais (verifique se estão corretos)
        const localPdfPaths = [
             path.join(__dirname, "../assets/Situacoes_nota_zero.pdf"), // Caminho relativo para voltar duas pastas
             path.join(__dirname, "../assets/Competencia_1.pdf"),
             path.join(__dirname, "../assets/Competencia_2.pdf"),
             path.join(__dirname, "../assets/Competencia_3.pdf"),
             path.join(__dirname, "../assets/Competencia_4.pdf"),
             path.join(__dirname, "../assets/Competencia_5.pdf"),
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

        // --- INSTRUÇÃO DETALHADA PARA A IA ---
        const detailedPromptInstruction = `
        **Instrução Detalhada para Avaliação da Redação ENEM:**

        Você é um corretor especialista do ENEM. Sua tarefa é analisar a redação fornecida abaixo, utilizando **estritamente** as informações e critérios presentes nos arquivos PDF anexados (Competência 1 a 5 e Situações de nota zero) como base para sua avaliação.

        **Formato da Resposta Obrigatório:**

        Siga **exatamente** esta estrutura de formatação em Markdown para a sua resposta:

        ---

        ### **Competência 1 – Domínio da norma culta da língua portuguesa**
        **Nota: [Nota C1 aqui]/200**

        [Análise detalhada da Competência 1. Mencione erros específicos de gramática, ortografia, pontuação, concordância etc., citando trechos do texto do aluno como exemplos. Ex: "Erro em '[trecho errado]' → Correto: '[trecho correto]'." Se não houver erros significativos, justifique a nota alta.]

        ---

        ### **Competência 2 – Compreensão do tema e aplicação das áreas de conhecimento**
        **Nota: [Nota C2 aqui]/200**

        [Análise detalhada da Competência 2. Avalie a compreensão do tema, a abordagem, e o uso de repertório sociocultural (citações, dados, fatos históricos, etc.). Indique pontos fortes (ex: ✅ Compreensão adequada do tema) e pontos a melhorar (ex: 🔹 Faltou repertório sociocultural legitimado). Seja específico sobre o que faltou ou poderia ser aprofundado.]

        ---

        ### **Competência 3 – Organização e progressão argumentativa**
        **Nota: [Nota C3 aqui]/200**

        [Análise detalhada da Competência 3. Avalie a estrutura do texto (introdução, desenvolvimento, conclusão), a coesão entre parágrafos, a clareza na defesa do ponto de vista e a progressão lógica das ideias. Aponte falhas na argumentação, lacunas ou conexões fracas entre as ideias.]

        ---

        ### **Competência 4 – Uso dos mecanismos linguísticos para argumentação**
        **Nota: [Nota C4 aqui]/200**

        [Análise detalhada da Competência 4. Avalie o uso de conectivos (conjunções, preposições), a coesão intra e interparágrafos e a variedade do vocabulário. Aponte repetições excessivas ou uso inadequado de elementos coesivos.]

        ---

        ### **Competência 5 – Elaboração da proposta de intervenção**
        **Nota: [Nota C5 aqui]/200**

        [Análise detalhada da Competência 5. Avalie se a proposta de intervenção é completa, detalhada e relacionada ao tema/argumentos. Verifique a presença dos elementos essenciais: Agente, Ação, Meio/Modo de execução, Finalidade e Detalhamento de um desses elementos. Indique o que está bom e o que pode ser melhorado ou está faltando.]

        ---

        ### **Nota final: [Soma das notas C1 a C5]/1000**

        [Breve resumo geral com os principais pontos fortes e fracos da redação. Ofereça recomendações claras e acionáveis (ex: ✔ Revisar concordância verbal; ✔ Incluir dados estatísticos) para o aluno melhorar.]

        ---

        **Texto do Aluno para Avaliação:**

        ${text}
        `;

// Limpa a instrução inicial genérica se ela não for mais necessária
// content.shift(); // Remove o primeiro item "{ text: "Use o seguinte contexto..." }" se não quiser mais ele

// Adiciona a instrução detalhada e o texto do aluno ao final
        content.push({ text: detailedPromptInstruction });

        console.log("Generating content with Gemini...");
        
        const requestPayload = [{ role: "user", parts: content }];
        const result = await ai.models.generateContent({ 
            model: "gemini-1.5-flash",
            contents: requestPayload 
        });
        const response = result;

        // console.log("\n--- Resposta da IA ---");
        // // Adicionar verificação se a resposta ou o texto existem
        // console.log("response:", response);
        // console.log("response.text:", response.text);
        // Exporta o texto final para um arquivo Markdown
        // const outputFilePath = path.join(process.cwd(), "resultado_avaliacao.md");
        // try {
        //     if (response && response.text) {
        //         await fs.writeFile(outputFilePath, response.text, "utf8");
        //         console.log(`Texto final exportado para: ${outputFilePath}`);
        //     } else {
        //         console.log("Nenhum texto foi gerado para exportar.");
        //     }
        // } catch (writeError) {
        //     console.error("Erro ao exportar o texto para o arquivo Markdown:", writeError);
        // }
        return response.text;

    } catch (error) {
        console.error("\n--- Erro fatal na execução do script: ---", error);
        if (error.code === 'ENOENT') {
             console.error(`Erro: Arquivo não encontrado. Verifique o caminho: ${error.path}`);
        }
    }
}

export async function generateRandomTheme() {
    try {
        // Instrução detalhada para o modelo
        const prompt = `
        **Instrução para Geração de Tema e Textos Motivadores:**

        Você é um especialista em redação do ENEM. Sua tarefa é gerar um tema aleatório para uma redação, seguido de três textos motivadores relacionados ao tema. Os textos motivadores devem ser informativos, baseados em dados reais ou fictícios, e devem ajudar o aluno a refletir sobre o tema.

        **Formato da Resposta Obrigatório:**

        ---
        ### **Tema da Redação**
        [Título do tema gerado aqui]

        ### **Textos Motivadores**
        1. [Texto motivador 1]
        2. [Texto motivador 2]
        3. [Texto motivador 3]
        ---

        Certifique-se de que o tema seja relevante e atual, e que os textos motivadores sejam claros, objetivos e úteis para o desenvolvimento da redação.
        `;

        // Configuração do conteúdo para o modelo
        const content = [{ text: prompt }];

        console.log("Solicitando tema e textos motivadores ao Gemini...");

        // Enviando a solicitação ao modelo Gemini
        const requestPayload = [{ role: "user", parts: content }];
        const result = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: requestPayload,
        });

        const response = result;

        // Verifica se a resposta foi gerada
        if (response && response.text) {
            console.log("\n--- Tema e Textos Motivadores Gerados ---");
            console.log(response.text);
            return response.text; // Retorna o texto gerado
        } else {
            console.warn("Nenhum texto foi gerado pelo modelo.");
            return null;
        }
    } catch (error) {
        console.error("\n--- Erro ao gerar tema e textos motivadores ---", error);
        throw error;
    }
}

// const themeAndMotivators = generateRandomTheme();
// console.log("Resultado:", themeAndMotivators);

console.log("Script Gemini inicializado");