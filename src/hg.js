import { HfInference } from "@huggingface/inference";

const HF_TOKEN = "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";

const inference = new HfInference(HF_TOKEN);

// // You can also omit "model" to use the recommended model for the task
// await inference.translation({
//   model: "t5-base",
//   inputs: "My name is Wolfgang and I live in Amsterdam",
// });

// await inference.imageToText({
//   data: await (await fetch("https://picsum.photos/300/300")).blob(),
//   model: "nlpconnect/vit-gpt2-image-captioning",
// });

export const runGPT2 = async (text) => {
  // Using your own inference endpoint: https://hf.co/docs/inference-endpoints/
  // const gpt2 = inference.endpoint(
  //   "https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2"
  // );
  // const { generated_text } = await gpt2.textGeneration({
  //   inputs: "The answer to the universe is",
  // });
  // const res = await inference.imageToText({
  //   data: await (await fetch("https://picsum.photos/300/300")).blob(),
  //   model: "nlpconnect/vit-gpt2-image-captioning",
  // });
  const res = await inference.textToImage({
    model: "runwayml/stable-diffusion-v1-5",
    inputs: text,
    parameters: {
      negative_prompt: "blurry",
    },
  });
  return res;
};

export const textGen = async (text) => {
  // Using your own inference endpoint: https://hf.co/docs/inference-endpoints/
  // const gpt2 = inference.endpoint(
  //   "https://xyz.eu-west-1.aws.endpoints.huggingface.cloud/gpt2"
  // );
  // const { generated_text } = await gpt2.textGeneration({
  //   inputs: "The answer to the universe is",
  // });
  // const res = await inference.imageToText({
  //   data: await (await fetch("https://picsum.photos/300/300")).blob(),
  //   model: "nlpconnect/vit-gpt2-image-captioning",
  // });
  const res = await inference.textGeneration({
    model: "mistralai/Mistral-7B-v0.1",
    inputs: text,
    parameters: {
      max_new_tokens: 100,
    },
  });
  return res;
};
