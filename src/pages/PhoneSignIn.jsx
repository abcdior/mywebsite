import { useState } from "react";
import "../styles/PhoneSignIn.css";
import VerifyOverlay from "../components/VerifyOverlay";
import { useNavigate } from "react-router-dom";

export default function PhoneSignIn() {
    const navigate = useNavigate();

    const [showOverlay, setShowOverlay] = useState(false);
    const [phone, setPhone] = useState("0533008214");
    const countryCode = "+233";

    const handleNext = () => {
        if (!phone.trim()) return;
        setShowOverlay(true);
    };

    const handleCancel = () => {
        setShowOverlay(false);
    };

    const handleConfirm = () => {
        setShowOverlay(false);
        navigate("/verify");
    };

    return (
        <div className="screen">
            <header className="topbar">
                <h1>Enter your phone number</h1>
            </header>

            <main className="content">
                <p>Verify that you are not a bot to access this page</p>
                <p className="description">
                    Complete human verification with Whatsapp app
                </p>

                <div className="country-row">

                    <label>Country</label>
                    <select disabled={true}>
                        <option>Ghana</option>
                        {/* <option>United States</option>
                        <option>United Kingdom</option> */}
                    </select>
                </div>

                <div className="phone-row">
                    <input
                        className="code"
                        type="text"
                        value={countryCode}
                        readOnly
                    />
                    <input
                        className="number"
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />
                </div>

                <p className="helper">
                    Carrier charges may apply
                </p>
            </main>

            <footer className="footer">
                <button
                    className="continue"
                    onClick={handleNext}
                >
                    Next
                </button>
            </footer>

            {showOverlay && (
                <VerifyOverlay
                    phone={phone}
                    countryCode={countryCode}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />

            )}
        </div>
    );
}