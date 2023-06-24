let MoodContract = undefined;
let signer = undefined;

const getMoodButton = document.getElementById("getMood");
const setMoodButton = document.getElementById("setMood");

const MoodContractAddress = "0x38da8de96963B143cB13bb0Ef0250faC7e874f5b";
const MoodContractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", [])
  .then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      console.log(signer);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  })
  .catch((error) => {
    console.error("Failed to connect to provider:", error);
  });

async function getMood() {
  try {
    const mood = await MoodContract.getMood();
    document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
    console.log(mood);
  } catch (error) {
    console.error("Failed to retrieve mood:", error);
  }
}

async function setMood() {
  try {
    const mood = document.getElementById("mood").value;
    await MoodContract.setMood(mood);
    console.log("Mood set successfully");
  } catch (error) {
    console.error("Failed to set mood:", error);
  }
}

getMoodButton.addEventListener("click", getMood);
setMoodButton.addEventListener("click", setMood);

console.log("Hello");


