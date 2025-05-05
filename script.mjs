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

const theme = "Desafios para a valorização da herança africana no Brasil";

// --- Função main (sem alterações, mas certifique-se que chama uploadLocalPDF) ---
async function main() {
    try {
        const content = [
             { text: "Use o seguinte contexto para avaliar o texto abaixo de acordo com as competências do ENEM, o tema é:", theme }
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
        const text = `Cultura, o que seria de um indivíduo se este atríbuto próprio não fosse valorizado? Como este indivíduo poderia participar de um meio social se toda sua herança não fosse reconhecida pela sociedade? Infelizmente, esta é a situação que se encontram as pessoas de descendência africana no Brasil.
	Tal problema se dá pelo alto preconceito e discriminação sofridos por afro-descendentes no Brasil. Fato que não é recente, pois, desde a época imperial, existem acontecimentos de repressão à herança africana, como a catequisação de escravos trazidos da África, além do próprio racismo que existe até os dias atuais.
	Com isso, espera-se alguma atitude por parte dos governantes, coisa que não se encontra com facilidade, exceto pelas leis de abolição à escravidão, estas que foram ineficientes e apenas retardaram a conquista da Lei Áurea.
	Atualmente, nada mais se fala sobre tais assuntos, no máximo algumas discussões sobre desigualdade racial e o respeito à todos. Porém, apenas a conscientizacação sobre o racismo não garante que a sociedade valorize a herança africana desses indivíduos, mesmo que amenize o problema.
	Portanto, necessita-se de resoluções mais assertivas vindas do Estado, como o estudo de culturas africanas nas aulas de artes nas escolas, a construção de mais centros artísticos e culturais pelo país, etc. Já do ponto de vista social, espera-se mais empatia e respeito com o próximo por parte dos indivíduos.`; // Coloque seu texto aqui

        const text1 = `	Após o início da pandemia de Covid-19, com o isolamento dos indivíduos, a necessidade de socialização e interação entre os mesmos foi cada vez mais sendo suprida em plataformas digitais. Entretanto, com o passar dos anos surgiu a dúvida sobre a responsabilidade das plataformas digitais, haja vista os impactos das redes sociais na saúde mental dos usuários.
	Diante disso, vale ressaltar os impactos causados pela alta liberação de dopamina, hormônio responsável pelo prazer, enquanto os usuários utilizam as redes sociais. Deste modo, os usuários viciam-se nas redes sociais de modo semelhante ao vício em intorpecentes, como o cigarro. Com isso, as redes sociais conseguem um fluxo constante de usuários, mesmo que estes sejam afetados mentalmente.
	Além disso, diversas plataformas digitais, como sites de notícias e redes sociais, utilizam algoritmos que sugerem conteúdos baseados em interesses dos usuários. Deste modo, as plataformas acabam fortalecendo pensamentos e opiniões de seus usuários, mesmo que estas sejam violentas e até mesmo discursos de ódio, embora as plataformas não sejam responsabilizadas.
	Portanto, para que os impactos das redes sociais na saúde mental dos usuários sejam amenizados, cabe ao Estado promover regulamentações para plataformas digitais por meio de projetos de lei, além de responsabilizá-los pelos conteúdos apresentados. Além disso, cabe a população promover atividades ao ar livre, visando diminuir os impactos das redes sociais na saúde mental dos usuários.`;

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

        console.log("\n--- Resposta da IA ---");
        // Adicionar verificação se a resposta ou o texto existem
        console.log("response:", response);
        console.log("response.text:", response.text);
        // Exporta o texto final para um arquivo Markdown
        const outputFilePath = path.join(process.cwd(), "resultado_avaliacao.md");
        try {
            if (response && response.text) {
                await fs.writeFile(outputFilePath, response.text, "utf8");
                console.log(`Texto final exportado para: ${outputFilePath}`);
            } else {
                console.log("Nenhum texto foi gerado para exportar.");
            }
        } catch (writeError) {
            console.error("Erro ao exportar o texto para o arquivo Markdown:", writeError);
        }

    } catch (error) {
        console.error("\n--- Erro fatal na execução do script: ---", error);
        if (error.code === 'ENOENT') {
             console.error(`Erro: Arquivo não encontrado. Verifique o caminho: ${error.path}`);
        }
    }
}

main();