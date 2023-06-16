import { ethers } from "ethers";

export default (req, res) => {
  const { count } = req.query;
  let status;
  if (count >= 1) {
    status = "success";
  } else {
    status = "error";
  }

  const wallets = [];
  const messages = {
    message: {
      total: count,
      status: status,
    },
  };

  wallets.push(messages);
  for (let i = 0; i < count; i++) {
    const wallet = ethers.Wallet.createRandom();
    const account = {
      id: i + 1, // Add ID to the account
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
    wallets.push(account);
  }

  res.status(200).json({ wallets });
};
