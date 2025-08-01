from flask import Flask, render_template, request, jsonify
import logging
from typing import Dict, List
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Supported language pairs (simplified for demo)
LANGUAGE_PAIRS = {
    'en-es': 'English to Spanish',
    'es-en': 'Spanish to English',
    'en-fr': 'English to French',
    'fr-en': 'French to English',
    'en-de': 'English to German',
    'de-en': 'German to English',
    'en-it': 'English to Italian',
    'it-en': 'Italian to English',
    'en-pt': 'English to Portuguese',
    'pt-en': 'Portuguese to English'
}

LANGUAGE_NAMES = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese'
}

def translate_text(text: str, language_pair: str) -> str:
    """
    Simple translation function for demo purposes.
    In a real implementation, this would use the MarianMT model.
    """
    if not text.strip():
        return ""
    
    # Simple demo translations
    demo_translations = {
        'en-es': {
            'hello': 'hola',
            'goodbye': 'adiós',
            'thank you': 'gracias',
            'please': 'por favor',
            'how are you': '¿cómo estás?',
            'good morning': 'buenos días',
            'good night': 'buenas noches',
            'hey': 'oye',
            'there': 'allí',
            'how': 'cómo',
            'are': 'estás',
            'you': 'tú',
            'hey there': 'oye tú',
            'hey there how are you': 'oye tú, ¿cómo estás?',
            'what is your name': '¿cómo te llamas?',
            'nice to meet you': 'encantado de conocerte',
            'where are you from': '¿de dónde eres?',
            'i love you': 'te quiero',
            'good afternoon': 'buenas tardes',
            'excuse me': 'disculpa',
            'i am sorry': 'lo siento',
            'you are welcome': 'de nada',
            'see you later': 'hasta luego'
        },
        'es-en': {
            'hola': 'hello',
            'adiós': 'goodbye',
            'gracias': 'thank you',
            'por favor': 'please',
            '¿cómo estás?': 'how are you',
            'buenos días': 'good morning',
            'buenas noches': 'good night',
            'oye': 'hey',
            'allí': 'there',
            'cómo': 'how',
            'estás': 'are you',
            'tú': 'you',
            'oye tú': 'hey there',
            'oye tú, ¿cómo estás?': 'hey there, how are you?',
            '¿cómo te llamas?': 'what is your name',
            'encantado de conocerte': 'nice to meet you',
            '¿de dónde eres?': 'where are you from',
            'te quiero': 'i love you',
            'buenas tardes': 'good afternoon',
            'disculpa': 'excuse me',
            'lo siento': 'i am sorry',
            'de nada': 'you are welcome',
            'hasta luego': 'see you later'
        }
    }
    
    text_lower = text.lower().strip()
    
    # Check if we have a demo translation
    if language_pair in demo_translations:
        # First try exact match
        for key, value in demo_translations[language_pair].items():
            if text_lower == key:
                return value
        
        # Try partial matches for common phrases
        if language_pair == 'en-es':
            if 'how are you' in text_lower:
                return '¿cómo estás?'
            elif 'good morning' in text_lower:
                return 'buenos días'
            elif 'good night' in text_lower:
                return 'buenas noches'
            elif 'thank you' in text_lower:
                return 'gracias'
            elif 'please' in text_lower:
                return 'por favor'
            elif 'hello' in text_lower or 'hi' in text_lower:
                return 'hola'
            elif 'goodbye' in text_lower or 'bye' in text_lower:
                return 'adiós'
            elif 'hey there' in text_lower:
                return 'oye tú'
            elif 'hey' in text_lower:
                return 'oye'
        
        elif language_pair == 'es-en':
            if '¿cómo estás?' in text_lower:
                return 'how are you'
            elif 'buenos días' in text_lower:
                return 'good morning'
            elif 'buenas noches' in text_lower:
                return 'good night'
            elif 'gracias' in text_lower:
                return 'thank you'
            elif 'por favor' in text_lower:
                return 'please'
            elif 'hola' in text_lower:
                return 'hello'
            elif 'adiós' in text_lower:
                return 'goodbye'
            elif 'oye tú' in text_lower:
                return 'hey there'
            elif 'oye' in text_lower:
                return 'hey'
    
    # For other cases, provide a more helpful response
    if language_pair == 'en-es':
        return f"Lo siento, no tengo una traducción exacta para '{text}'. Intenta con frases más simples como 'hello', 'how are you', 'thank you', etc."
    elif language_pair == 'es-en':
        return f"Sorry, I don't have an exact translation for '{text}'. Try simpler phrases like 'hola', '¿cómo estás?', 'gracias', etc."
    else:
        return f"Translation not available for '{text}' in {language_pair}. Try English-Spanish or Spanish-English."

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html', languages=LANGUAGE_NAMES)

@app.route('/translate', methods=['POST'])
def translate():
    """Translation API endpoint"""
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        language_pair = data.get('language_pair', 'en-es')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        if language_pair not in LANGUAGE_PAIRS:
            return jsonify({'error': 'Unsupported language pair'}), 400
        
        logger.info(f"Translating: '{text}' to {language_pair}")
        
        translated_text = translate_text(text, language_pair)
        
        return jsonify({
            'translated_text': translated_text,
            'original_text': text,
            'language_pair': language_pair
        })
        
    except Exception as e:
        logger.error(f"Translation error: {str(e)}")
        return jsonify({'error': 'Translation failed'}), 500

@app.route('/supported-languages')
def supported_languages():
    """Get supported languages endpoint"""
    return jsonify({
        'language_pairs': LANGUAGE_PAIRS,
        'language_names': LANGUAGE_NAMES
    })

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Language Translator is running',
        'version': '1.0.0'
    })

if __name__ == '__main__':
    # Ensure directories exist
    os.makedirs('templates', exist_ok=True)
    os.makedirs('static', exist_ok=True)
    os.makedirs('static/css', exist_ok=True)
    os.makedirs('static/js', exist_ok=True)
    
    print("=" * 50)
    print("   Language Translator - Demo Version")
    print("=" * 50)
    print("Starting Flask application...")
    print("Open your browser and go to: http://localhost:5000")
    print("=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000) 