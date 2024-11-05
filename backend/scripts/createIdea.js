const { ethers } = require("hardhat");

async function main() {
  const contract = await ethers.getContractAt("IdeaFactory",
  //add the contract address that you just deployed in the last step
  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512') //line 6
  const res = await contract.createIdeaToken({
    name: "Pokegang 123",
    symbol: "POKG",
    description: "A Web3-powered platform for trading Pokemon cards using blockchain technology. Buy, sell, and swap digital Pokemon cards securely with collectors worldwide while tracking card authenticity and ownership history.",
    tokenImageUrl: "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/bafkreibfmlj5z6uyzwtbnkzgzjszuetvzbedi4xpezurzq2pctzzpex2yy",
    productUrl: "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/bafkreidsrw6e3nw3trqjcmnd6zud6drfv2xiagfw5dwih2nhoycatwxsce",
    categories: "78a06390-1ce7-45b7-b5ff-da78e3cd16dd",
    productScreenshotUrl: "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/bafkreidctwmrxmec75jfxwfsbyycb3sf3y7whdxk3shcteezdqavuimhzq",
    twitterUrl: ""
  }, {
      value: ethers.parseEther("0.0001")
    }
  )
  console.log(res)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
