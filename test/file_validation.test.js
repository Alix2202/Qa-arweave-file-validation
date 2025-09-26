// QA Web3 - Test for tx_id.txt validity after Arweave upload
// Author: Raúl Casado – GaslessQA
// https://www.linkedin.com/in/gaslessqa/

const fs = require("fs");
const path = require("path");

describe("Arweave TXID Validation", () => {
  const txFile = path.join(__dirname, "../tx_id.txt");

  test("tx_id.txt file should exist", () => {
    const exists = fs.existsSync(txFile);
    expect(exists).toBe(true);
  });

  test("tx_id.txt should contain a valid TXID", () => {
    const content = fs.readFileSync(txFile, "utf-8").trim();
    expect(content).toMatch(/^[a-z0-9_-]{43}$/i); // Typical TXID pattern in Arweave
  });
});
