import pytest
from app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_page(client):
    """Test that the home page loads successfully"""
    response = client.get('/')
    assert response.status_code == 200

def test_health_endpoint(client):
    """Test the health check endpoint"""
    response = client.get('/health')
    assert response.status_code == 200
    data = response.get_json()
    assert data['status'] == 'healthy'

def test_supported_languages(client):
    """Test the supported languages endpoint"""
    response = client.get('/supported-languages')
    assert response.status_code == 200
    data = response.get_json()
    assert 'language_pairs' in data
    assert 'language_names' in data

def test_translation_endpoint(client):
    """Test the translation endpoint"""
    response = client.post('/translate', 
                          json={'text': 'hello', 'language_pair': 'en-es'})
    assert response.status_code == 200
    data = response.get_json()
    assert 'translated_text' in data
    assert data['original_text'] == 'hello'

def test_translation_empty_text(client):
    """Test translation with empty text"""
    response = client.post('/translate', 
                          json={'text': '', 'language_pair': 'en-es'})
    assert response.status_code == 400

def test_translation_invalid_language(client):
    """Test translation with invalid language pair"""
    response = client.post('/translate', 
                          json={'text': 'hello', 'language_pair': 'invalid'})
    assert response.status_code == 400 