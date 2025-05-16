# Protótipo ZkDonation Fee Dynamics

**Branch:** Daniel  
**Status:** Protótipo de validação da lógica de taxas dinâmicas por provas ZK  
**Objetivo:** Demonstrar PoC sem alterar o main nem outras branches.

## Descrição
Este protótipo contém:
- **contracts/ZkDonation.sol**: contrato Solidity que bloqueia doações acima de um limite até que provas ZK sejam submetidas; quanto mais provas, menor a taxa.
- **scripts/submitProof.js**: script que envia uma prova dummy à zkVerify Testnet e depois chama `registerProof` no contrato.
- **test/feeDynamics.test.js**: testes unitários mostrando bloqueio total e redução de taxa após provas.

Tudo está restrito à branch `Daniel`—não afeta o projeto principal.

## Instruções de Uso

1. Na raiz do repositório:
   ```bash
   git checkout Daniel
   npm install

