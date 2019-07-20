import Scholarships from "./contracts/Scholarships.json";
import Applicants from "./contracts/Applicants.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
  contracts: [Scholarships, Applicants],
  events: {
    SimpleStorage: ["StorageSet"],
  },
  polls: {
    accounts: 1500,
  },
};

export default options;
