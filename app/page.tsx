"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [scans, setScans] = useState<Array<Schema["ScanResult"]["type"]>>([]);

  // جلب نتائج الفحص السابقة من قاعدة البيانات
  function listScans() {
    client.models.ScanResult.observeQuery().subscribe({
      next: (data) => setScans([...data.items]),
    });
  }

  useEffect(() => {
    listScans();
  }, []);

  // دالة لبدء عملية الفحص (محاكاة)
  function startNewScan() {
    const url = window.prompt("Enter URL to scan (e.g., https://example.com)");
    if (url) {
      client.models.ScanResult.create({
        targetUrl: url,
        status: "Scanning...",
        riskLevel: "Pending",
      });
    }
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Security Scanner Dashboard</h1>
      <button onClick={startNewScan} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        + Start New Scan
      </button>

      <table style={{ marginTop: '20px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
            <th>Target URL</th>
            <th>Status</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {scans.map((scan) => (
            <tr key={scan.id} style={{ borderBottom: '1px solid #eee' }}>
              <td>{scan.targetUrl}</td>
              <td>{scan.status}</td>
              <td>{scan.riskLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '40px', fontSize: '0.8rem', color: '#666' }}>
        Scanner powered by AWS Amplify Gen 2.
      </div>
    </main>
  );
}
