import {Injectable} from '@nestjs/common';
import {AzureChatOpenAI} from "@langchain/openai";
import {z} from "zod"

@Injectable()
export class ObjectiveGenAiService {
    model = new AzureChatOpenAI({
        model: 'gpt-4o',
        temperature: 1,
        maxTokens: undefined,
        maxRetries: 2,
        azureOpenAIApiKey: "8ue5ftH0WzddAy4hyu9Nf5Bqn7nyAQBXFtiBPlPtKqX7GJBeoEPfJQQJ99BBACYeBjFXJ3w3AAABACOGXDPd", // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
        azureOpenAIApiInstanceName: "ibc-2025", // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
        azureOpenAIApiDeploymentName: "gpt-4o-interns-bootcamp-2025", // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
        azureOpenAIApiVersion: "2024-08-01-preview", // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
    });


    systemPrompt = `Make objective with a proper objective title and required key results. Please return **only** an object in JSON format of type "ObjectiveType".

    Example of "ObjectiveType":
    {
        "title": "Increase Product Sales",
        "keyResults": [
            {
                "title": "Achieve monthly sales of Product A",
                "initialValue": 500,
                "currentValue": 520,
                "targetValue": 1000,
                "metrics": "units sold"
            },
            {
                "title": "Achieve monthly sales of Product B",
                "initialValue": 300,
                "currentValue": 350,
                "targetValue": 800,
                "metrics": "units sold"
            },
            {
                "title": "Increase total revenue from product sales",
                "initialValue": 20000,
                "currentValue": 25000,
                "targetValue": 50000,
                "metrics": "dollars"
            }
        ]
    }

    Return **only** the JSON object, no other text, markdown, or extra information.`;

    async getResponse(query: string): Promise<any> {
        const aiMsg = await this.model.invoke([
            ['system', this.systemPrompt],
            ['human', query]
        ]);
        let messageContent = aiMsg.content;

        if (typeof messageContent === 'string') {
            try {
                //console.log('------original', messageContent);
                // messageContent = messageContent.replace(/```.*?```/gs, '');
                // messageContent = messageContent.replace(/```/g, '');
                // messageContent = messageContent.trim();
                //console.log('>>>>>trim', messageContent);
                messageContent = JSON.parse(messageContent);
                console.log('........JSON', messageContent);
            } catch (error) {
                console.error("Error parsing AI response as JSON:", error);
                throw new Error("Invalid JSON format returned from AI.");
            }
        }

        const keyResultZod = z.object({
            title: z.string(),
            initialValue: z.number(),
            currentValue: z.number(),
            targetValue: z.number(),
            metrics: z.string()
        });
        const objectiveZod = z.object({
            title: z.string(),
            keyResults: z.array(keyResultZod)
        });
        try {
            const validatedObjective = objectiveZod.parse(messageContent);
            console.log(validatedObjective);
            return validatedObjective;
        } catch (error) {
            console.error("Validation failed:", error.errors);
            throw new Error("Invalid objective format returned from AI.");
        }
    }
}


