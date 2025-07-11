# 🔍 CodeWeaver CLI


[![npm version](https://img.shields.io/npm/v/codeweaver-cli.svg)](https://www.npmjs.com/package/codeweaver-cli)
[![npm downloads](https://img.shields.io/npm/dt/codeweaver-cli)](https://www.npmjs.com/package/codeweaver-cli)
[![GitHub stars](https://img.shields.io/github/stars/Satyan2309/codeweaver-cli?style=social)](https://github.com/Satyan2309/codeweaver-cli)

> A powerful full-stack static analysis and integration mapping CLI tool. CodeWeaver helps developers trace frontend-backend data flow, visualize architecture, validate TypeScript contracts, and generate integration docs effortlessly.

---

## 🚀 Features

### 🔬 Core Analysis
- `scan` — Analyze the full project structure and dependencies
- `map` — Map frontend components to backend APIs
- `trace` — Trace variables and data across the stack
- `contracts` — Validate frontend interfaces vs backend responses

### 🧠 Integration Insights
- `visualize` — Auto-generate architecture diagrams
- `suggest` — Recommend refactors and API usage improvements
- `docs` — Generate markdown-based integration documentation

---

## 📦 Installation

```bash
npm install -g codeweaver-cli
```

## 🛠️ CLI Usage

```bash 
codeweaver scan --project . --analyze-dependencies
codeweaver map --frontend src --backend api
codeweaver trace --variable userId --across-stack
codeweaver contracts --frontend src --backend api
codeweaver visualize --format mermaid
codeweaver suggest
codeweaver docs --output API_DOC.md
```

## 📄 Example Output
```bash

$ codeweaver contracts --frontend src --backend api

📊 Analyzing contracts between src and api

🔎 Backend responds with:
 - id
 - email

💻 Frontend TS interfaces expect:
 - id
 - email
 - username

❌ Contract Mismatches:
 ⚠️  Frontend expects 'username' but backend does not return a matching key
```


## 📂 Folder Structure
```bash

codeweaver-cli/
├── bin/                  # CLI entrypoint (codeweaver.js)
├── lib/                  # Core logic modules
│   ├── scanner.js        # Project scanner
│   ├── mapper.js         # Frontend-backend mapper
│   ├── tracer.js         # Variable tracer
│   └── analyzer.js       # Contracts analyzer
├── utils/                # Shared utilities (AST, file reading, logger)
├── test/                 # Jest unit tests for each module
├── examples/             # Sample frontend-backend projects (optional)
├── README.md             # This file
├── .gitignore            # Node modules, logs, envs
├── package.json          # NPM config
├── CHANGELOG.md          # Optional changelog

```
## ✅ Current Features Summary

Feature	Command

- Scan project    ——	codeweaver scan --project .
- Map API links	  ——    codeweaver map --frontend src --backend api
- Trace variables ——	codeweaver trace --variable userId
- Check contracts ——	codeweaver contracts
- Visualize graph ——	codeweaver visualize
- Suggest optimiz ——	codeweaver suggest
- Generate docs	  ——    codeweaver docs --output API_DOC.md



## 📄 License
###MIT License. Feel free to use and improve the tool with attribution.



## 👨‍💻 Author
Built with by Satyan Sinha
GitHub: https://github.com/Satyan2309/codeweaver-cli

# ⭐ Star the Repo
# If you find this helpful, consider giving it a ⭐ on GitHub!