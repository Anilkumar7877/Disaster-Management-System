// pages/api/runPython.js
import { spawn } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Spawn a child process to run the Python script
        const pythonProcess = spawn('python', ['app.py']);

        let output = '';

        // Capture data from the Python script
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Handle errors
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Python Error: ${data}`);
        });

        // Respond when the Python script finishes execution
        pythonProcess.on('close', (code) => {
            console.log(`Python script exited with code ${code}`);
            res.status(200).json({ output });
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
