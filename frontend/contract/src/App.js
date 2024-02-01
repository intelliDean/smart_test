import './App.css';
import contractABI from "./abi.json"
import React from 'react';
import {Formik} from "formik";

const ethers = require('ethers');


function App() {

    const contractAddress = "0x0d3Df5C18cc48099a3a829E56d1628afb904f278";

    // "0x52fFFd126E03b5e06C0bA850aB297ab79cbe3Bb6";


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
            const contract =
                new ethers.Contract(contractAddress, contractABI, await signer);
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

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <section className="form">
                        <Formik initialValues={{Message: ""}} onSubmit={async (values, {setSubmitting}) => {
                                await setMessage(values.Message)
                                setSubmitting(true);
                                values.Message = ""
                            }}>
                            {({
                                  values,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <h2>Message</h2>
                                        <textarea
                                            id="com"
                                            cols="30"
                                            rows="10"
                                            name="Message"
                                            onBlur={handleBlur}
                                            value={values.Message}
                                            onChange={handleChange}>
                                       </textarea><br/>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn btn-block"
                                        >
                                            {isSubmitting ? "Creating Message..." : "Create Message"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </section>
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
