import { ethers, Signer, Provider, JsonRpcProvider } from "ethers";
import {
  DONATION_MANAGER_ABI,
  DONATION_MANAGER_ADDRESS,
} from "@/lib/web3/donationManager";

// Exemplo de hook para acessar o contrato DonationManager
export function useDonationManager(
  signerOrProvider?: Signer | Provider
) {
  return new ethers.Contract(
    DONATION_MANAGER_ADDRESS,
    DONATION_MANAGER_ABI,
    signerOrProvider ||
      new JsonRpcProvider("http://127.0.0.1:8545")
  );
}

// Exemplo de uso em um componente React/Next.js:
// const contract = useDonationManager(signer);
// await contract.createDonation(...)
// await contract.donate(donationId, { value: ethers.utils.parseEther("0.1") })
