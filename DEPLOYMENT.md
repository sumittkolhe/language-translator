# 🚀 Deployment Guide

## Quick Start

### Option 1: Using Startup Scripts (Recommended)

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

1. **Install Python 3.8+**
   ```bash
   # Check if Python is installed
   python --version
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application**
   ```bash
   python app.py
   ```

4. **Access the Application**
   - Open your browser
   - Go to: `http://localhost:5000`

## GitHub Deployment

### 1. Create a New Repository
- Go to GitHub and create a new repository
- Don't initialize with README (we already have one)

### 2. Upload Your Project
```bash
git init
git add .
git commit -m "Initial commit: Language Translator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 3. Deploy to Platforms

#### Heroku
1. Create a `Procfile`:
   ```
   web: python app.py
   ```
2. Deploy using Heroku CLI or GitHub integration

#### Railway
1. Connect your GitHub repository
2. Railway will auto-detect Python and deploy

#### Render
1. Connect your GitHub repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `python app.py`

## Environment Variables

Create a `.env` file for production:
```env
FLASK_ENV=production
FLASK_DEBUG=False
PORT=5000
```

## Production Considerations

- Use a production WSGI server like Gunicorn
- Set up proper logging
- Configure environment variables
- Use HTTPS in production
- Set up monitoring and health checks

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change port in `app.py` or kill existing process

2. **Dependencies not found**
   - Run `pip install -r requirements.txt`

3. **Permission denied (Linux/Mac)**
   - Run `chmod +x start.sh`

4. **Python not found**
   - Install Python 3.8+ from python.org 