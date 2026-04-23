import { useEffect, useState } from "react";

export default function CodeLogs() {
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        try {
            const response = await fetch("/api/logs");
            const data = await response.json();
            setLogs(data);
        } catch (err) {
            console.error("Failed to fetch logs", err);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: "2rem", fontFamily: "monospace" }}>
            <h2>Verification Logs (Recent First)</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td style={{ fontWeight: "bold", color: "#007bff" }}>{log.code}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}