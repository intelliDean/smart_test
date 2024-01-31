import './App.css';
import contractABI from "./abi.json"
import React, {useState} from 'react';

const ethers = require('ethers');


function App() {

    const contractAddress = "0x52fFFd126E03b5e06C0bA850aB297ab79cbe3Bb6";


    async function requestAccount() {
        await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
    }

    async function setMessage(message) {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, await signer);

            try {
                const transaction = await contract.setMessage(message);
                await transaction.wait();
                console.log("Message added successfully")

            } catch (err) {
                console.error('Error:', err);
            }

        }
    }


    async function getMessage() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, await signer);

            try {
                document.getElementById("display").textContent = await contract.getMessage();
            } catch (err) {
                console.error('Error:', err);
            }

        }
    }

    const [message, setInput] = useState('');
    const handleTextareaChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);
    };

    const handleSendMessage = () => {
        setInput(message);
    };


    return (
        <div className="App">
            <header className="App-header">
                <div>

                    <form>
                        <label htmlFor="com">Message</label><br/>
                        <textarea id="com" cols="30" rows="10" value={message} onChange={handleTextareaChange}></textarea><br/>
                        <button id={"but"} onClick={handleSendMessage}>Send Message</button>
                    </form>
                </div>
                <hr/>
                <div>
                    <button id={"but"} onClick={() => getMessage()}>View Message</button>
                </div>
                <h1 id={"display"}></h1>
            </header>
        </div>
    );
}

export default App;
