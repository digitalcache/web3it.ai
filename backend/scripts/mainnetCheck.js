const { ethers } = require("hardhat");

async function main() {
  // Grab the contract factory
  const tokenCt = await ethers.deployContract("IdeaFactory");

  await tokenCt.createIdeaToken(
    "PokeSwap 123",
    "PSWP",
    "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/bafkreibfmlj5z6uyzwtbnkzgzjszuetvzbedi4xpezurzq2pctzzpex2yy",
    "A Web3-powered platform for trading Pokemon cards using blockchain technology. Buy, sell, and swap digital Pokemon cards securely with collectors worldwide while tracking card authenticity and ownership history.",
    "78a06390-1ce7-45b7-b5ff-da78e3cd16dd",
    "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/bafkreidsrw6e3nw3trqjcmnd6zud6drfv2xiagfw5dwih2nhoycatwxsce",
    "https://bronze-deep-gazelle-81.mypinata.cloud/ipfs/bafkreidctwmrxmec75jfxwfsbyycb3sf3y7whdxk3shcteezdqavuimhzq",
    "", {
      value: ethers.parseEther("0.0001")
    }
  )
  const ideas = await tokenCt.getAllIdeaTokens();
  console.log("initializing token buy", ideas)

  const ideaTokenAddress = await tokenCt.ideaTokenAddresses(0)
  console.log("token address ", ideaTokenAddress)
  await tokenCt.buyIdeaToken(ideaTokenAddress, 800000, {
      value: 24048064056000000000n
  });
  console.log("all token bought")
 

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
