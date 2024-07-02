# Opis

Front-end aplikacji SUDO stworzonej w ramach pracy inżynierskiej.

## Uruchomienie projektu

0. Skopiuj .env.example do .env.development i dopasuj wartości pod swoje środowisko.
1. Wpisz `yarn / npm install` aby zainstalować biblioteki.
2. Wpisz `yarn run dev` aby uruchomić program w środowisku developerskim.

## Uruchamianie projektu w trybie produkcyjnym

1. Wpisz `yarn run build`.
2. Wpisz `yarn run start`.

## Buildowanie projektu np. Electron

1. Wpisz `yarn run build:electron`
2. Wpisz `npx cap open @capacitor-community/electron`

## Buildowanie projektu pod platformy mobilne np. ios (wymagane xcode command line tools)

1. Wpisz `yarn run build:ios`
2. Wpisz `npx cap open ios`.
3. Zbuilduj projekt pod wybraną platformę i uruchom na docelowym środowisku wybranym w Xcode.

## Aktualizacja typów API

1. Wpisz `yarn run update:api` - uwaga: wymagany jest włączony serwer API.

## Aktualizacja typów słownika językowego

1. Wpisz `yarn run update:lang`.
