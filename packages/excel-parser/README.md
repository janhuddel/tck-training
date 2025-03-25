# @tck-training/excel-parser

Diese Bibliothek stellt Funktionen bereit, um Trainingstermine aus einer Excel-Datei zu ermitteln (üblicherweise die Hallentermine für eine Winter-Runde).

## Installation

```bash
npm install @tck-training/excel-parser
# or
yarn add @tck-training/excel-parser
```

## Funktionen

Die Bibliothek exportiert folgende Hauptfunktionen:

### parseExcelFile

Liest eine Excel-Datei und erzeugt daraus eine Datenstuktur (`TrainingCalendar`)

### createCalenderForPlayer

Hilfsfunktion, um den Kalender auf die Termine eines bestimmten Spielers zu reduzieren

### getTrainingPartnerStats

Eine Funktion, um die Häufkeit der Trainigspartner zu ermitteln

## Konfigurationen

Die Bibliothek enthält vordefinierte Konfigurationen, die über `DEFAULT_CONFIGS` verfügbar sind:

- H50: Konfiguration H50 (Herren 50)
- PROVI: Konfiguration Provinzial-Runnde (Mixed/Dienstags)

## Typen

Folgende TypeScript-Typen werden exportiert:

- `TrainingCalendar`: Repräsentiert einen Trainingskalender
- `TrainingEvent`: Repräsentiert ein einzelnes Trainingsereignis

## Verwendung

```typescript
import { parseExcelFile } from "@tck-training/excel-parser";

const calendar = await parseExcelFile('path-to-excel-file', DEFAULT_CONFIGS.H50);
calendar.events.forEach((event: TrainingEvent) => {
  console.log(event.date, event.players);
}):
```

## Lizenz

MIT

## Autor

Jan Rohwer
