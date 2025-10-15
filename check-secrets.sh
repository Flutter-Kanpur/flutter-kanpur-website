# !/bin/bash

# List of your secrets
SECRETS=(
  NEXT_PUBLIC_FIREBASE_API_KEY
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  NEXT_PUBLIC_FIREBASE_PROJECT_ID
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  NEXT_PUBLIC_FIREBASE_APP_ID
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  PROJECT_DOMAIN
)

echo "🔍 Checking Firebase Secrets..."
echo "---------------------------------"

for secret in "${SECRETS[@]}"
do
  echo "Secret: $secret"
  firebase functions:secrets:access "$secret"
  echo "---------------------------------"
done
