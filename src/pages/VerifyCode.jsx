import { useState, useRef } from "react";
import "../styles/VerifyCode.css";

export default function VerifyCode() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async () => {
        const finalCode = code.join("");
        if (finalCode.length < 6) return;

        setLoading(true);
        try {
            const response = await fetch("/api/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: finalCode }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect on success
                window.location.href = "https://google.com";
            } else {
                alert(data.message || "Invalid code");
            }
        } catch (error) {
            console.error("Verification failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-screen">
            <header className="verify-header">
                <h1>Enter verification code</h1>
            </header>

            <main className="verify-content">
                <p className="verify-desc">We sent a 6-digit code to your phone</p>
                <div className="code-row">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputsRef.current[index] = el)}
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            disabled={loading}
                        />
                    ))}
                </div>
            </main>

            <footer className="verify-footer">
                <button
                    className="verify-btn"
                    onClick={handleSubmit}
                    disabled={loading || code.includes("")}
                >
                    {loading ? "Verifying..." : "Continue"}
                </button>
            </footer>
        </div>
    );
}