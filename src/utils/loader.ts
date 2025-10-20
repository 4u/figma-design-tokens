import { writeFileSync } from "fs";

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_ID = process.env.FIGMA_FILE_ID;

if (!FIGMA_TOKEN || !FILE_ID) {
  throw new Error(
    "Please set FIGMA_TOKEN and FIGMA_FILE_ID in your environment variables."
  );
}

const headers = {
  "X-Figma-Token": FIGMA_TOKEN,
};

async function fetchVariables() {
  const url = `https://api.figma.com/v1/files/${FILE_ID}`;

  console.log(`Fetching variables from Figma file ID: ${url}`);

  const response = await fetch(url, {
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Figma API error: ${response.status} ${text}`);
  }

  writeFileSync("./figma-response.json", await response.text(), "utf-8");
  const data = await response.json();
  return data;
}

export async function load() {
  const data = await fetchVariables();

  return data;
}
