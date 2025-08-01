# Language Translator - Web Application

A modern, web-based language translation application with a beautiful responsive UI. Built with Flask and featuring demo translations with the option to upgrade to full AI-powered translation models.

## 🌟 Features

- **Demo Translations**: Pre-built translations for common phrases
- **Multiple Languages**: Support for 6 languages (English, Spanish, French, German, Italian, Portuguese)
- **Upgradeable**: Easy to upgrade to full AI-powered translation models
- **Real-time Translation**: Auto-translate feature with configurable delay
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Text-to-Speech**: Hear translations using Web Speech API
- **Copy to Clipboard**: Easy text copying functionality
- **Keyboard Shortcuts**: Quick translation with Ctrl+Enter
- **Language Swapping**: One-click language pair swapping
- **Character Counting**: Real-time character count display
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

#### Option 1: Using Startup Scripts (Recommended)

**Windows:**
```bash
start.bat
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

#### Option 2: Manual Setup

1. **Clone or download the project**
   ```bash
   # If you have git installed
   git clone <repository-url>
   cd language-translator
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**
   ```bash
   python app.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📋 Supported Languages

| Language | Code | Language | Code |
|----------|------|----------|------|
| English | en | Spanish | es |
| French | fr | German | de |
| Italian | it | Portuguese | pt |

## 🎯 Usage

### Basic Translation
1. Select source language from the left dropdown
2. Select target language from the right dropdown
3. Type or paste text in the source text area
4. Click "Translate" or press Ctrl+Enter

### Auto-Translation
1. Click "Auto Translate" to enable real-time translation
2. Type in the source text area
3. Translation will appear automatically after 1 second of inactivity

### Additional Features
- **Swap Languages**: Click the exchange button to quickly swap source and target languages
- **Copy Text**: Use the copy buttons to copy text to clipboard
- **Text-to-Speech**: Click the speaker icon to hear the translation
- **Clear Text**: Use the clear buttons to reset text areas

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Translate text |
| `Ctrl + Shift + Enter` | Toggle auto-translate |
| `F1` | Show keyboard shortcuts |

## 🛠️ Technical Details

### Backend
- **Framework**: Flask (Python)
- **Translation Models**: MarianMT from Hugging Face Transformers
- **Model Caching**: Automatic model loading and caching for performance
- **API Endpoints**: RESTful API for translation requests

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript**: Vanilla JS with modern ES6+ features
- **Responsive Design**: Mobile-first approach with breakpoints

### Demo Translations
The current version includes pre-built translations for common phrases:
- Greetings: hello, goodbye, good morning, etc.
- Common expressions: thank you, please, how are you, etc.
- Useful phrases: what is your name, nice to meet you, etc.

### Upgrading to Full AI Translation
To use full AI-powered translation models:
1. Install additional dependencies: `pip install transformers torch sentencepiece`
2. Replace `app.py` with the full MarianMT version
3. The application will automatically download and cache translation models
- Optimized for speed and accuracy
- Automatic model downloading on first use

## 📁 Project Structure

```
language-translator/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Stylesheets
    └── js/
        └── script.js     # JavaScript functionality
```

## 🔧 Configuration

### Environment Variables
You can configure the application using environment variables:

```bash
# Optional: Set Flask environment
export FLASK_ENV=development
export FLASK_DEBUG=1

# Optional: Set custom port
export PORT=5000
```

### Model Configuration
Translation models are automatically downloaded on first use. You can customize the model selection in `app.py`:

```python
LANGUAGE_PAIRS = {
    'en-es': 'Helsinki-NLP/opus-mt-en-es',
    # Add more language pairs as needed
}
```

## 🚀 Deployment

### Local Development
```bash
python app.py
```

### Production Deployment
For production deployment, consider using:
- **Gunicorn**: `gunicorn -w 4 -b 0.0.0.0:5000 app:app`
- **Docker**: Create a Dockerfile for containerized deployment
- **Cloud Platforms**: Deploy to Heroku, AWS, or Google Cloud

## 🔍 API Endpoints

### POST /translate
Translate text between languages.

**Request:**
```json
{
    "text": "Hello, world!",
    "source_lang": "en",
    "target_lang": "es"
}
```

**Response:**
```json
{
    "original_text": "Hello, world!",
    "translated_text": "¡Hola, mundo!",
    "source_lang": "en",
    "target_lang": "es"
}
```

### GET /supported-languages
Get list of supported languages and language pairs.

### GET /health
Health check endpoint.

## 🐛 Troubleshooting

### Common Issues

1. **Model Download Fails**
   - Check internet connection
   - Ensure sufficient disk space
   - Try running with `--trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org`

2. **Translation Errors**
   - Verify language pair is supported
   - Check text length (max 512 tokens)
   - Ensure text is not empty

3. **Performance Issues**
   - First translation may be slow due to model loading
   - Subsequent translations will be faster
   - Consider using GPU if available

### Logs
Check the console output for detailed error messages and debugging information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for the translation models
- [Helsinki-NLP](https://github.com/Helsinki-NLP) for the MarianMT models
- [Font Awesome](https://fontawesome.com/) for the icons
- [Google Fonts](https://fonts.google.com/) for the Inter font

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the console logs
3. Open an issue on the repository

---

**Happy Translating! 🌍✨** 