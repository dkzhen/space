import { ethers } from "ethers";

export default (req, res) => {
  const { count } = req.query;

  const wallets = [];
  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = wallet.privateKey;
    wallets.push({ privateKey });
  }

  res.status(200).json({ wallets });
};
