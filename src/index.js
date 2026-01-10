const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>DevOps Showcase | Lalit Shinkar</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;500;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
          background: #0f2027;
          background: linear-gradient(135deg, #2c5364, #203a43, #0f2027);
          color: #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .card {
          background-color: #1e2a38;
          padding: 2rem;
          border-radius: 15px;
          max-width: 750px;
          width: 90%;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          text-align: center;
          border: 1px solid #2d3f53;
        }

        h1 {
          font-size: 2.2rem;
          color: #00d4ff;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          font-weight: 300;
          font-size: 1.1rem;
          color: #ccc;
          margin-bottom: 2rem;
        }

        .highlight {
          display: inline-block;
          background: linear-gradient(to right, #ff416c, #ff4b2b);
          padding: 0.4rem 1rem;
          border-radius: 30px;
          color: #fff;
          font-weight: 500;
          margin: 1rem 0;
        }

        ul {
          list-style: none;
          padding: 0;
          text-align: left;
          margin-top: 2rem;
        }

        ul li {
          padding: 0.4rem 0;
          font-size: 1rem;
        }

        .stack {
          margin-top: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }

        .stack span {
          background-color: #fff;
          color: #1e2a38;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          transition: transform 0.3s ease;
        }

        .stack span:hover {
          transform: scale(1.05);
        }

        .footer {
          margin-top: 2.5rem;
          font-size: 0.85rem;
          color: #999;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .footer a {
          color: #00d4ff;
          margin-left: 10px;
          text-decoration: none;
        }

        .social-icons {
          margin-top: 0.5rem;
        }

        .social-icons a {
          margin: 0 10px;
          font-size: 1.3rem;
          color: #00d4ff;
        }

        .social-icons a:hover {
          color: #ff4b2b;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🌐 DevOps Web App</h1>
        <p class="subtitle">An end-to-end automation demo using modern DevOps tools</p>

        <div class="highlight">👨‍💻 Lalit Shinkar | DevOps Practitioner</div>

        <ul>
          <li>✅ Continuous Integration with <strong>Jenkins</strong></li>
          <li>🐳 Containerization using <strong>Docker</strong></li>
          <li>⚙️ Infra as Code via <strong>Terraform</strong></li>
          <li>🔧 Config Management using <strong>Ansible</strong></li>
          <li>☁️ Hosted on <strong>AWS Cloud</strong></li>
          <li>🔗 Version Control through <strong>Git & GitHub</strong></li>
        </ul>

        <div class="stack">
          <span>Node.js</span>
          <span>Express</span>
          <span>Git</span>
          <span>Docker</span>
          <span>Ansible</span>
          <span>Terraform</span>
          <span>AWS</span>
          <span>Jenkins</span>
        </div>

        <div class="footer">
          <div>Visits: ${Math.floor(Math.random() * 5000)}</div>
          <div>Server: http://localhost:${port}</div>
          <div class="social-icons">
            <a href="https://linkedin.com/in/lalit-shinkar" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://github.com/lalit-shinkar" target="_blank"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
