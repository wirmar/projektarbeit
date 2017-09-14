Polymer bietet mit der Verwendung von aktuellen Technologien einen Einblick, wohin die Webentwicklung in den nächsten Jahren gehen wird.
Dabei setzt es auf eine Komponenten orientierte Architektur, welche im Webumfeld immer populärer wird.
Durch Features wie lokale CSS Regeln werden alte Probleme gelöst.
Polymer setzt anders als andere ähnliche populäre Bibliotheken damit stark auf Browsernative Technologien statt eigenen Abstraktionen.

Der größte Nachteil von Polymer ist seine scheinbar kleine Community, unter der das Entwickler Tooling leidet.
Es fehlt ein einfaches Buildtool, welches ohne Konfiguration "einfach funktioniert" (Beispiel [create-react-app](https://github.com/facebookincubator/create-react-app)).
Die offizielle Dokumentation kam mir unstrukturiert und überkompliziert vor.
Beim testen der Applikation ist man sehr beschränkt und muss das Polymer eigene Testing Tool lernen.
Einfache unittests schienen mir schwer bis gar nicht möglich.

Ein weiteres Problem, für welches aber bereits für Polymer 3 eine [Lösung](https://www.polymer-project.org/blog/2017-08-22-npm-modules) angekündigt wurde, ist die Verwendung des mittlerweile unüblichen Paketmanagers bower (npm von offiziellem tooling nicht unterstützt) und die unübliche Verwndung von html Dateien und html imports.
Dadurch integriert sich Polymer kaum in das bestehende Web Frontend Ökosystem.
