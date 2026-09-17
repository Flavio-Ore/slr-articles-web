import type { GetFileParameters, GoogleGenAI } from "@google/genai";

export async function uploadRemotePDF({ ai, displayName, url }: { ai: GoogleGenAI, url: string | URL | Request, displayName: string }) {
  const pdfBuffer = await fetch(url)
    .then((response) => response.arrayBuffer());
  const fileBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      displayName: displayName,
    },
  });

  const config: GetFileParameters = {
    name: file?.name ?? '',
  };
  console.log({
    config,
  })

  let getFile = await ai.files.get(config);

  while (getFile.state === 'PROCESSING') {
    console.log(`current file status (before ai): ${getFile.state}`);
    getFile = await ai.files.get(config);
    console.log(`current file status (after ai): ${getFile.state}`);
  }

  if (file.state === 'FAILED') {
    throw new Error('File processing failed.');
  }

  return file;
}