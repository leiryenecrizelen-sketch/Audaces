import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface LandingPageContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  problem: {
    title: string;
    description: string;
  };
  solutions: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  benefits: Array<{
    title: string;
    description: string;
  }>;
  aboutImmersion: {
    title: string;
    description: string;
  };
}

export async function generateLandingPageContent(
  companyName: string,
  segment: string,
  role: string
): Promise<LandingPageContent> {
  const prompt = `
    Você é um especialista em marketing e inteligência artificial para negócios.
    Sua tarefa é criar o conteúdo de uma landing page personalizada para a imersão "IA para Negócios".
    
    O público-alvo é:
    - Empresa: ${companyName}
    - Segmento: ${segment}
    - Cargo: ${role}

    O conteúdo deve ser persuasivo, profissional e focado em como a IA resolve problemas específicos desse cargo e segmento.
    Baseie-se na proposta de valor da imersão "IA para Negócios" (que ensina empresários e gestores a usarem IA na prática para aumentar produtividade e lucro).

    Gere o conteúdo no formato JSON seguindo este esquema:
    {
      "hero": {
        "title": "Um título impactante que mencione o cargo ou segmento",
        "subtitle": "Um subtítulo que explique como a IA vai transformar o dia a dia na ${companyName}",
        "cta": "Texto do botão de ação"
      },
      "problem": {
        "title": "O grande desafio de um ${role} no setor de ${segment}",
        "description": "Descreva as dores comuns que a IA pode resolver"
      },
      "solutions": [
        { "title": "Solução 1", "description": "Como a IA resolve um problema X", "icon": "Nome de um ícone da Lucide (ex: Zap, Brain, TrendingUp)" },
        { "title": "Solução 2", "description": "Como a IA resolve um problema Y", "icon": "Nome de um ícone da Lucide" },
        { "title": "Solução 3", "description": "Como a IA resolve um problema Z", "icon": "Nome de um ícone da Lucide" }
      ],
      "benefits": [
        { "title": "Benefício 1", "description": "Ganho real de tempo ou dinheiro" },
        { "title": "Benefício 2", "description": "Ganho real de tempo ou dinheiro" }
      ],
      "aboutImmersion": {
        "title": "Por que a Imersão IA para Negócios é para você?",
        "description": "Um parágrafo conectando a imersão com as necessidades da ${companyName}"
      }
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", // Using flash for speed
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hero: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              subtitle: { type: Type.STRING },
              cta: { type: Type.STRING },
            },
            required: ["title", "subtitle", "cta"],
          },
          problem: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
          solutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING },
              },
              required: ["title", "description", "icon"],
            },
          },
          benefits: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ["title", "description"],
            },
          },
          aboutImmersion: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ["title", "description"],
          },
        },
        required: ["hero", "problem", "solutions", "benefits", "aboutImmersion"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
}
