const { ZkVerifyClient } = require('zkverifyjs');
const hre = require('hardhat');

async function main() {
  const client = new ZkVerifyClient({
    nodeUrl: 'https://volta.zkverify.io',
    signer: null
  });
  const dummy = { proof: '0x1234', vk: '0xdead' };
  const txZk = await client.submitProof(dummy);
  await txZk.waitFor('finalized');
  console.log('Prova verificada!');

  const [owner] = await hre.ethers.getSigners();
  const donation = await hre.ethers.getContractAt('ZkDonation', process.env.CONTRACT_ADDRESS);
  await donation.connect(owner).registerProof(owner.address);
  console.log('registerProof executado!');
}

main().catch(console.error);
