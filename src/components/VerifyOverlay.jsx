import "../styles/VerifyOverlay.css";

function VerifyOverlay({
    phone,
    countryCode,
    onCancel,
    onConfirm
}) {
    return (
        <div className="overlay">

            <div className="overlay-card">

                <h2>Verify phone number</h2>

                <p>
                    We will verify the phone number:
                </p>

                <div className="phone-preview">
                    {countryCode} {phone}
                </div>

                <p className="overlay-note">
                    Is this OK, or would you like to edit the number?
                </p>

                <div className="overlay-actions">

                    <button
                        className="overlay-btn cancel"
                        onClick={onCancel}
                    >
                        Edit
                    </button>

                    <button
                        className="overlay-btn confirm"
                        onClick={onConfirm}
                    >
                        OK
                    </button>

                </div>

            </div>

        </div>
    );
}

export default VerifyOverlay;