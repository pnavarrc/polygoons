const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    rinkeby: {
      provider: function () {
        return new HDWalletProvider([
          // Deplyment account create in Truffle Console. Use only for ZOS deployments, not testing.
          //  Public Address: 0x87A07D2c2Bdfb082e1811f1945217962d078e494
          /*  Private Key */ '0x8f397bb31894f9de2282b096929b5db9354b9566379120d5b01b8b231ec31d4b',
        ], 'https://rinkeby.infura.io/v3/b7922ee061c44d33a236a2b35210cae9', 0, 1)
      },
      network_id: 4,
      gas: 4612388
    }
  },
};
