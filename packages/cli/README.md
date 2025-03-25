# @tck-training/cli

Tool (CLI), um Trainingstermine aus einer Excel-Datei zu lesen und in verschiedenen Formaten auszugeben.

## Features

- Trainingstermine tabellarisch anzeigen
- Generierung von ICS um die Termine einfach in einem Kalender importieren zu können

## Installation

Die Tool kann auf 2 verschiedene Arten verwendet werden:

### Verwendung mit npx (Empfohlen)

```bash
npx @tck-training/cli <command> [options]
```

### Globale Installation

```bash
npm install -g @tck-training/cli
```

## Verwendung

Die CLI bietet zwei Hauptbefehle: `print` und `ics`. Beide Befehle benötigen eine Excel-Datei und einen Konfigurationsnamen.

### Allgemeine Optionen

- `-c, --config <name>`: Name der zu verwendenden Konfiguration (erforderlich)
- `-p, --player <name>`: Filtert den Zeitplan für einen bestimmten Spieler

### Print-Befehl

Zeigt den Trainingsplan in einer formatierten Tabelle an:

```bash
tck-training print <excel-datei> -c <config-name> [-p <spieler-name>]
```

Beispiel:

```bash
tck-training print training.xlsx -c H50 -p "John Doe"
```

### ICS-Befehl

Generiert eine ICS-Kalenderdatei, die in Kalender-Anwendungen importiert werden kann:

```bash
tck-training ics <excel-datei> -c <config-name> [-p <spieler-name>]
```

Beispiel:

```bash
tck-training ics training.xlsx -c H50 -p "John Doe" > kalender.ics
```

## Lizenz

MIT

## Autor

Jan Rohwer
