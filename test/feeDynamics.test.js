const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ZkDonation', function () {
  let ct, donor;
  beforeEach(async () => {
    [ , donor ] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory('ZkDonation');
    ct = await Factory.deploy();
    await ct.deployed();
  });

  it('bloqueia tudo para grandes doações sem provas', async () => {
    await ct.connect(donor).donate({ value: ethers.utils.parseEther('20') });
    expect(await ct.lockedFunds(donor.address))
      .to.equal(ethers.utils.parseEther('20'));
  });

  it('reduz taxa conforme provas são registradas', async () => {
    await ct.registerProof(donor.address);
    const rate = await ct.getFeeRate(donor.address);
    expect(rate).to.be.lt(500);
  });
});
