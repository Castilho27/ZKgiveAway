import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

export async function doLogin() {
  if (!window.ethereum) throw new Error("MetaMask is not installed. Please install it to use this app.");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length) throw new Error("No account found. Please connect to MetaMask.");

  localStorage.setItem("wallet", accounts[0]);
  return accounts[0];
}

function getContract() {
  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet");
  if (!from) throw new Error("No wallet address found in localStorage.");
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

// Cria uma nova doação (Donation)
export async function createDonation(title: string, description: string, suggestedAmountEth: string) {
  await doLogin();
  const contract = getContract();
  const suggestedAmountWei = Web3.utils.toWei(suggestedAmountEth, "ether");
  return contract.methods.createDonation(title, description, suggestedAmountWei).send();
}

// Retorna o número total de doações
export async function getDonationCount() {
  const contract = getContract();
  return contract.methods.donationCount().call();
}

// Retorna uma doação específica pelo id
export async function getDonation(id: number) {
  const contract = getContract();
  return contract.methods.donations(id).call();
}

// Doa para uma doação específica
export async function donate(id: number, amountEth: string) {
  await doLogin();
  const contract = getContract();
  return contract.methods.donate(id).send({
    value: Web3.utils.toWei(amountEth, "ether"),
  });
}

// Faz o saque dos fundos de uma doação
export async function withdraw(id: number) {
  await doLogin();
  const contract = getContract();
  return contract.methods.withdraw(id).send();
}

// Retorna o endereço do owner do contrato
export async function getOwner() {
  const contract = getContract();
  return contract.methods.owner().call();
}

// Retorna a taxa total acumulada
export async function getTotalFee() {
  const contract = getContract();
  return contract.methods.totalFee().call();
}

// Verifica se a conta conectada é o owner
export async function isOwner() {
  const account = await getCurrentAccount();
  const owner = await getOwner();
  if (typeof account === "string" && typeof owner === "string") {
    // return account.toLowerCase() === owner.toLowerCase();
  }
  return false;
}

// Retorna a conta conectada
export async function getCurrentAccount() {
  if (!window.ethereum) throw new Error("MetaMask not installed");
  const accounts: string[] = await window.ethereum.request({
    method: "eth_accounts",
  });
  return accounts && accounts.length > 0 ? accounts[0] : null;
}

// Retorna as últimas doações criadas
export async function getRecentDonations(limit = 5) {
  const contract = getContract();
  const count = parseInt(await contract.methods.donationCount().call(), 10);
  if (count === 0) return [];
  const result = [];
  type Donation = {
    author: string;
    title: string;
    description: string;
    suggestedAmount: string;
    totalReceived: string;
    exists: boolean;
  };

  for (let i = 0; i < Math.min(limit, count); i++) {
    const id = count - 1 - i;
    const donation = await contract.methods.donations(id).call() as Donation | null;
    if (donation && donation.exists) {
      result.push({
        id,
        author: donation.author,
        title: donation.title,
        description: donation.description,
        suggestedAmount: Web3.utils.fromWei(donation.suggestedAmount, "ether"),
        totalReceived: Web3.utils.fromWei(donation.totalReceived, "ether"),
        exists: donation.exists,
      });
    }
  }
  return result;
}