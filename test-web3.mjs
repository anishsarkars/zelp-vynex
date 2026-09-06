import { ethers } from "ethers";

async function test() {
  const p = new ethers.JsonRpcProvider("https://robinhood-rpc.publicnode.com", 4663, { staticNetwork: true });
  const FACTORY_ABI = ["function allVaults() view returns (address[])"];
  const factory = new ethers.Contract("0xee57E1B9B87Ca4318E046FAE2C45923f61d8D199", FACTORY_ABI, p);
  
  try {
    const addrs = await factory.allVaults();
    console.log("Vaults:", addrs);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
