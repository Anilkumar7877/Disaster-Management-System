// dashboard/api/runScript.js
import { exec } from 'child_process';
import path from 'path';

export default function handler(req, res) {
  const scriptPath = path.join(process.cwd(), 'dashboard', 'app.py');
  
  exec(`python ${scriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Standard Error: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    console.log(`Output: ${stdout}`);
    res.status(200).json({ message: "Python script executed successfully", output: stdout });
  });
}
