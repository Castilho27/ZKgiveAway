## Resumo Executivo

Este README descreve brevemente o protótipo de **ZkDonation** na branch **Daniel**, onde implementamos a lógica de taxas dinâmicas e bloqueio de fundos baseada na submissão de provas ZK, utilizando a rede **zkVerify** para verificação de provas. Trata‑se de um **PoC (Proof of Concept)** não‑funcional, cujo objetivo é ilustrar o fluxo de doação → submissão de prova → ajuste de taxa/liberação de fundos.

---

## 1. Objetivo do Protótipo

Este código demonstra como ajustar automaticamente a taxa cobrada sobre doações: quanto **menos** provas ZK submetidas, **maior** a taxa; acima de certo valor doado e com provas insuficientes, os fundos são **bloqueados** até que provas mínimas sejam adicionadas. ([docs.zkverify.io][1])

---

## 2. Estrutura do Projeto

* **contracts/ZkDonation.sol**

  * Contrato Solidity que implementa:

    1. `donate()`: recebe ETH, calcula `feeRate` via `getFeeRate()` e decide entre aplicar taxa ou bloquear fundos.
    2. `registerProof()`: chamada após prova ser validada por zkVerify, incrementa contador de provas e possivelmente libera fundos bloqueados.
    3. `getFeeRate()`: lógica que retorna 100% de taxa para bloqueio (para doações ≥ limiar com provas < mínimas) ou reduz taxa de forma linear conforme provas se acumulam. ([zkverify.io][2])

* **scripts/submitProof.js**

  * Script Node.js usando **zkverifyjs** para:

    1. Submeter uma “prova dummy” ao **Volta Testnet** de zkVerify.
    2. Aguardar confirmação (`finalized`) da verificação da prova na blockchain zkVerify.
    3. Invocar `registerProof()` no contrato, sincronizando o contador de provas on‑chain. ([blog.zkverify.io][3])

* **test/feeDynamics.test.js**

  * Testes unitários em Hardhat que ilustram:

    1. Bloqueio total de doações grandes (≥ 10 ETH) sem provas, validando `lockedFunds`.
    2. Redução da taxa (`getFeeRate`) após registro de provas, conferindo valor < taxa base. ([members.delphidigital.io][4])

* **README.md**

  * Este documento, que explica o propósito do PoC e orienta como testar localmente.

---

## 3. Por que zkVerify?

1. **Verificação off‑chain de ZK Proofs**: zkVerify é uma blockchain modular dedicada à verificação de provas ZK, reduzindo significativamente o custo em comparação a verificar diretamente em Ethereum ([docs.zkverify.io][1]).
2. **Economia de Gás**: prover verificação fora de L1 mitiga gastos de 200k–300k gas por prova no Ethereum, enquanto zkVerify oferece taxas fixas menores e estáveis ([docs.zkverify.io][1]).
3. **Suporte a múltiplos esquemas de prova** (Groth16, PLONK, STARK), permitindo flexibilidade ao gerar provas em diferentes ferramentas (Circom, Noir, RISC0) ([GitHub][5]).

---

## 4. Fluxo Esperado (não‑funcional)

1. **Doação**

   * Usuário chama `donate()` no contrato, passando valor em ETH.
   * `getFeeRate()` calcula taxa baseada em `proofsSubmitted` e `totalDonated` (bloqueia se necessário). ([zkverify.io][2])

2. **Submissão de Prova**

   * Backend executa `submitProof.js`, enviando prova à zkVerify e aguardando confirmação. ([blog.zkverify.io][3])

3. **Registro de Prova**

   * Após confirmação, chama `registerProof(address)` no contrato (via Hardhat).
   * Incrementa `proofsSubmitted` e libera fundos se `getFeeRate()` caiu abaixo de 100 %. ([GitHub][6])

4. **Resultado**

   * Taxa efetiva aplicada ao doador diminui conforme provas adicionais.
   * Grandes doações só são desbloqueadas após submissão de provas suficientes (minProofs). ([members.delphidigital.io][4])

---

## 5. Como Testar Localmente

```bash
git checkout Daniel
npm install
npx hardhat compile
npx hardhat test
```

* **Compilar** o contrato e rodar testes básicos.
* Os testes não interagem com zkVerify; apenas checam a lógica de `getFeeRate` e `lockedFunds`. ([GitHub][6])

Para simular o fluxo completo (parte off‑chain + on‑chain):

```bash
CONTRACT_ADDRESS=<endereço_local_do_contrato> \
npx hardhat run scripts/submitProof.js --network volta
```

* Requer que você tenha configurado `hardhat.config.js` com endpoint `https://volta.zkverify.io`. ([blog.zkverify.io][3])

---

## 6. Limitações do Protótipo

* **Provas dummy**: o script usa `proof: '0x1234', vk: '0xdead'` apenas para demonstração; **não** são provas válidas ([X (formerly Twitter)][7]).
* **Nenhuma geração de prova**: não há circuitos Circom/Noir integrados; geração de provas reais é necessária para fluxo completo.
* **Sem front‑end**: toda a interação é via Hardhat e Node.js, não há interface de usuário.

---

## 7. Próximos Passos Desejados

1. **Integrar geração de provas** (Circom + SnarkJS ou Noir/Plonky2) para criar provas reais de doação.
2. **Ajustar parâmetros** (`minProofs`, `lockThreshold`, `baseFee`, `maxProofs`) conforme casos de uso reais.
3. **Desenvolver front‑end** que permita ao usuário realizar doações, visualizar status de bloqueio/taxa e submeter provas pela carteira Web3.
4. **Monitorar custos reais** de verificação em zkVerify Testnet e comparar com L1 para validar economia. ([zkverify.io][2])

---

### Referências

1. zkVerify Documentation — O que é zkVerify e por que usar
2. zkVerify Whitepaper — Arquitetura modular e redução de custos de verificação
3. zkVerify GitHub — Guia de como executar nós e integrar provas via `zkverifyjs`
4. Blog zkVerify — Tutorial de submissão de prova com Tenderly e Testnet Volta
5. zkVerify Testnet Volta — Endpoint público para testes de prova
6. Delphi Digital — Análise de zkVerify otimizando verificação ZK em escala
7. Twitter zkVerify — Updates sobre suporte a múltiplos esquemas e roadmap
8. Hardhat Documentation — Como configurar redes customizadas e scripts de deploy
9. Circom SnarkJS — Ferramentas para gerar provas ZK (futuro passo)
10. OpenZeppelin Contracts — Uso de `Ownable` para controle de acesso em Solidity

[1]: https://docs.zkverify.io/?utm_source=chatgpt.com "zkVerify Documentation: What is zkVerify"
[2]: https://zkverify.io/?utm_source=chatgpt.com "zkVerify"
[3]: https://blog.zkverify.io/?utm_source=chatgpt.com "zkVerify blog"
[4]: https://members.delphidigital.io/reports/zkverify-optimizing-zk-proof-verification-at-scale?utm_source=chatgpt.com "zkVerify: Optimizing ZK Proof Verification At Scale - Delphi Digital"
[5]: https://github.com/zkVerify/zkverify-docs?utm_source=chatgpt.com "zkVerify/zkverify-docs - GitHub"
[6]: https://github.com/zkVerify/zkVerify?utm_source=chatgpt.com "zkVerify is a highly performant, secure, and decentralized ... - GitHub"
[7]: https://x.com/zkvprotocol?utm_source=chatgpt.com "zk V e r i f y (@ZKVProtocol) / X"
