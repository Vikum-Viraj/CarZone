import { GoogleGenerativeAI } from "@google/generative-ai";

async function fileBase64(file){
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString('base64');
}
export async function processCarImageWithAI(file) {
    try {
        // Check if API key is available
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Gemini API key is not configured");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const base64Image = await fileBase64(file);
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: file.type,
            }
        };

        const prompt = `
    Analyze this car image and extract the following information:
    1. Make (manufacturer)
    2. Model
    3. Year (approximately)
    4. Color
    5. Body type (SUV, Sedan, Hatchback, etc.)
    6. Mileage
    7. Fuel type (your best guess)
    8. Transmission type (your best guess)
    9. Price (your best guess)
    9. Short Description as to be added to a car listing
    \n\nFormat your response as a clean JSON object with these fields:\n{\n  \"make\": \"\",\n  \"model\": \"\",\n  \"year\": 0000,\n  \"color\": \"\",\n  \"price\": \"\",\n  \"mileage\": \"\",\n  \"bodyType\": \"\",\n  \"fuelType\": \"\",\n  \"transmission\": \"\",\n  \"description\": \"\",\n  \"confidence\": 0.0\n}\n\nFor confidence, provide a value between 0 and 1 representing how confident you are in your overall identification.\nOnly respond with the JSON object, nothing else.\n`;

    } catch (error) {}
}