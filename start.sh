#!/bin/bash

echo "========================================"
echo "   Language Translator - AI-Powered"
echo "========================================"
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed or not in PATH"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

echo "Python found! Installing dependencies..."
pip3 install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    echo "Please check your internet connection and try again"
    exit 1
fi

echo
echo "Dependencies installed successfully!"
echo
echo "Starting the Language Translator..."
echo
echo "The application will be available at: http://localhost:5000"
echo "Press Ctrl+C to stop the server"
echo

python3 app.py 