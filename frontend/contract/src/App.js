import './App.css';
import contractABI from "./abi.json"
import React from 'react';
import {Formik} from "formik";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ethers = require('ethers');


function App() {
    const contractAddress = "0x0d3Df5C18cc48099a3a829E56d1628afb904f278";

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
                toast.success("Message retrieved")
            } catch (err) {
                console.error('Error:', err);
            }

        }
    }


    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        await setMessage(values.Message);
        resetForm();
        await setSubmitting(true);
        toast.success("Message created")
    };


    return (
        <div className="App">
            <header className="App-header">
                <h2>Message</h2>
                <div id={"whole"}>
                    <div>
                        <section className="form">
                            <Formik initialValues={{Message: ''}} onSubmit={handleSubmit}>
                                {({
                                      values,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">

                                            <textarea
                                                id="com"
                                                cols="30"
                                                rows="10"
                                                name="Message"
                                                onBlur={handleBlur}
                                                value={values.Message}
                                                onChange={handleChange}
                                                placeholder="Type your message here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`btn ${isSubmitting ? 'submitting' : ''}`}
                                            >
                                                {isSubmitting ? 'Creating Message...' : 'Create Message'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </section>
                    </div>
                    <hr/>
                    <div>
                        <button id="but" onClick={() => getMessage()}>
                            View Message
                        </button>
                        <h1 id="display"></h1>
                    </div>
                </div>
            </header>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
