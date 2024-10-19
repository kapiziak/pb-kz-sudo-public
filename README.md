# Opis

Front-end aplikacji SUDO stworzonej w ramach pracy inżynierskiej.

UWAGA: Komendy mogą działać nieprawidłowo w Powershellu. Zaleca się używanie CMD na Windowsie.

## Uruchomienie projektu

0. Skopiuj .env.example do .env.development i dopasuj wartości pod swoje środowisko.
1. Wpisz `yarn / npm install` aby zainstalować biblioteki.
2. Wpisz `yarn run dev` aby uruchomić program w środowisku developerskim.

## Uruchamianie projektu w trybie produkcyjnym

1. Wpisz `yarn run build`.
2. Wpisz `yarn run start`.

## Tworzenie pierwszego użytkownika.

Ta sekcja została opisana w README backendowym.

## Uruchomienie testów E2E (Playwright)

1. Uruchom back-end zgodnie z instrukcją README w projekcie pb-kz-sudo-backend.
2. Uruchom front-end `npm run dev`.
3. Według instrukcji tworzenia pierwszego użytkownika stwórz konto, z danych, z pliku `tests/fixtures/common-data.json`.
   Użytkownik jest potrzebny, ponieważ większość funkcjonalności wymaga zalogowania, a logika aplikacji zakłada tworzenie kont tylko przez administratorów.
4. Uruchom `npm run test`.

## Uruchomienie projektu na platformie Electron

1. Wejdź do katalogu electron i wpisz `npm install`.
2. Wróć do głównego katalogu i wpisz `npm run dev:electron`.
   2a. Jeżeli powyższa opcja za pierwszym razem nie zadziała spróbuj uruchomić przed `npx cap update @capacitor-community/electron`

## Uruchomienie projektu na platformach mobilnych np. ios (wymagane xcode command line tools)

1. Wpisz `yarn run build:ios`
2. Wpisz `npx cap open ios`.
3. Zbuilduj projekt pod wybraną platformę i uruchom na docelowym środowisku wybranym w Xcode.

## Aktualizacja typów API

1. Wpisz `yarn run update:api` - uwaga: wymagany jest włączony serwer API.

## Aktualizacja typów słownika językowego

1. Wpisz `yarn run update:lang`.
