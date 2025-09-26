// QA Web3 - Arweave File Upload + On-Chain Validation
// Author: Raúl Casado – GaslessQA
// https://www.linkedin.com/in/gaslessqa/

const { spawn } = require("child_process");
const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const ARDRIVE_PATH = process.env.ARDRIVE_CLI || "ardrive"; // path to ardrive CLI
const FILE_PATH = process.env.FILE_PATH;
const TX_ID_PATH = "./tx_id.txt"; // File to store transaction ID

async function uploadFile() {
  console.log("\u23f3 Uploading file to Arweave using ArDrive CLI...");

  const upload = spawn(ARDRIVE_PATH, ["upload-file", FILE_PATH, "--no-overwrite"]);

  const output = [];

  upload.stdout.on("data", (data) => {
    output.push(data.toString());
  });

  upload.stderr.on("data", (data) => {
    console.error("\u274C Error:", data.toString());
  });

  upload.on("close", (code) => {
    if (code !== 0) {
      console.error(`\u274c Upload process exited with code ${code}`);
      return;
    }

    const txLine = output.find(line => line.includes("Transaction ID"));
    if (!txLine) {
      console.error("\u274c Transaction ID not found in output");
      return;
    }

    const txId = txLine.split(":")[1].trim();
    fs.writeFileSync(TX_ID_PATH, txId);
    console.log(`\u2705 File uploaded successfully. Transaction ID: ${txId}`);
    verifyTxOnViewBlock(txId);
  });
}

async function verifyTxOnViewBlock(txId) {
  console.log("\u23f3 Verifying transaction on ViewBlock...");
  const url = `https://viewblock.io/arweave/tx/${txId}`;
  try {
    const res = await axios.get(`https://arweave.net/tx/${txId}`);
    if (res.data && res.status === 200) {
      console.log("\u2705 Transaction is live on Arweave and accessible on ViewBlock:");
      console.log(url);
    } else {
      console.error("\u274c Transaction not accessible yet.");
    }
  } catch (err) {
    console.error("\u274c Error verifying transaction:", err.message);
  }
}

uploadFile();
