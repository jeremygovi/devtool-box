#!/bin/bash

# Variables
HOST=myhost.com
PORT=80
TIMEOUT=5

# Vérification des arguments
if [ -z "$HOST" ] || [ -z "$PORT" ]; then
    echo "Usage: $0 <host> <port>"
    exit 1
fi

# Test de la connexion avec timeout
nc -z -v -w $TIMEOUT $HOST $PORT &>/dev/null

# Vérification du code de retour de nc
if [ $? -eq 0 ]; then
    echo "✅ L'hôte $HOST est joignable sur le port $PORT."
else
    echo "❌ L'hôte $HOST n'est pas joignable sur le port $PORT."
fi
