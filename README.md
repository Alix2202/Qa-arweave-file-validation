# QA Web3 - Arweave File Validation

This QA automation script uploads a file to the Arweave network using ArDrive CLI and validates its on-chain status using ViewBlock.

## 📊 Objective

- Upload files to a decentralized, permanent storage (Arweave)
- Capture the transaction ID (TXID)
- Verify the TXID is live and publicly accessible
- Useful for validating decentralized file uploads in dApps or Web3 storage flows

## 🚀 How to Run

1. Install [ArDrive CLI](https://docs.ardrive.io/docs/cli-installation)

2. Clone the repository:
```bash
git clone https://github.com/yourusername/qa-arweave-file-validation.git
cd qa-arweave-file-validation
```

3. Set up the environment:
Create a `.env` file based on `.env.example`

```env
FILE_PATH=./yourfile.txt
ARDRIVE_CLI=/usr/local/bin/ardrive
```

4. Run the script:
```bash
node qa-arweave-file-validation.js
```

## 📊 Output

- Shows upload success and TXID
- Checks availability on Arweave and ViewBlock

```
✅ File uploaded successfully. Transaction ID: abc123...
✅ Transaction is live on Arweave and accessible on ViewBlock:
https://viewblock.io/arweave/tx/abc123...
```

## 🧐 About

This project is part of Raúl Casado's Web3 QA portfolio, focused on decentralized systems, distributed storage and on-chain verification practices.

## 📃 Author
**Raúl Casado – GaslessQA**  
🔗 [https://www.linkedin.com/in/gaslessqa/](https://www.linkedin.com/in/gaslessqa/)

## 📚 License
MIT
