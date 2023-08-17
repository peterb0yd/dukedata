import { getEmbeddings } from "../openAI/openAI.service";

export class ChromaEmbeddingFunction {

  constructor() {}

  public async generate(texts: string[]): Promise<number[][]> {
    const embeddingPromises = [];
    for (const text of texts) {
      embeddingPromises.push(getEmbeddings(text));
    }
    const embeddings = await Promise.all(embeddingPromises);
    return embeddings;
  }
}