# Setup und Entwicklung

Um das vue-laravel Tutorial aufrufen zu können, sind folgende Schritte nötig.

1. Backend-Abhängigkeiten installieren und Datenbankschema initialisieren

	 Für die Backend-Abhängigkeiten wird [Composer](https://getcomposer.org) benötigt. Danach können die Abhängigkeiten installiert werden
	 ```
	 composer install
	 ```
	 Um die Datenbank zu konfigurieren, wird eine `.env`-Datei benötigt. Ist diese noch nicht vorhanden, kann folgender Befehl ausgeführt werden:
	 ```
	 composer run-script post-root-package-install
	 ```
	 Danach lassen sich die Datenbankmigrationen und die dazugehörige Befüllung mit Daten ausführen, sofern in der Datei `.env` die Datenbank korrekt hinterlegt wurde.
	 ```
	 php artisan migrate
	 php artisan db:seed
	 php artisan passport:install
	 ```

2. PHP Server für die API starten

	Für die API wird ein PHP-Server benötigt.
	```
	php -S localhost:80 -t public
	```

3. Frontend-Abhängigkeiten installieren

	Für die Frontend-Abhängigkeiten verwenden wir den [Node Package Manager](https://nodejs.org/en/download/).
	```
	npm install
	```

4. webpack-dev-server starten.

	Für die Entwicklung wird ein lokaler webpack-dev-server eingesetzt. 
	```
	npm run dev
	```

5. Nun kann die Anwendung aufgerufen werden.

	```
	http://localhost:8080
	```

# Frontend // Webanwendung

Das Frontend besteht aus einer vue.js-App, die die Daten der Backend-API abruft und entsprechende dynamische Webseiten generiert. Die Dokumentation des Frameworks findet sich auf der [vue.js Website](https://vuejs.org/v2/guide).

Zum Abruf der Daten wird [Axios](https://github.com/axios/axios ) verwendet. Für die Authentifizierung wird ein entsprechender Token mitgesendet, sofern dieser im Local Storage gefunden werden kann. Das State Handling übernimmt dabei [Vuex](https://github.com/vuejs/vuex). Alle Funktionen bezüglich der Authentifizierung befinden sich unter ``public/src/js/store.js``.

## Routing

Zum Routing wird [vue-router](https://github.com/vuejs/vue-router/) genutzt. Alle Routen finden sich in ``public/src/js/router.js``. Auch wird hier vor jedem Routenaufruf geprüft, ob der Nutzer diese sehen darf und wenn nicht wird er zum Login weitergeleitet.

## Material Design mit vuetify

Um im Frontend Material Design Komponenten einsetzen zu können, wird [vuetify](https://vuetifyjs.com/en/getting-started/quick-start) eingesetzt. Dieses bindet die Material Design Icons ein. Es wird dabei 'A-la-carte' genutzt, damit nur diejenigen Komponenten gebundled werden, die auch tatsächlich im Einsatz sind. Die Styles sind als Stylus-Dateien eingebunden und können in de vue-Komponenten per SCSS überschrieben werden. Zum Beispiel:

Es gibt folgende Elemente im Frontend:

* Produkte
* Firmen
* Kontaktformular
* Login
* Adminbereich

# Backend // API

Das Backend besteht aus einer Lumen-API, die alle Daten entsprechend aufbereitet aus der MySQL-Datenbank ausgibt. Die Dokumentation des Frameworks findet sich auf der [Lumen Website](https://lumen.laravel.com/docs).

## Routen

Das Routing befindet sich in der ``routes/web.php``. Momentan gibt es folgende Endpunkte:

* ``/products`` liefert alle Produkte
  * ``/products/{id}`` liefert spezifisches Produkt 
* ``/companies`` liefert alle Firmen 
  * ``/companies/{id}`` liefert spezifische Firma incl. deren Produkte
* ``/contacts`` überträgt eine eingetragene Kontaktanfrage
* ``/private/contacts`` liefert alle eingetragenen Kontaktanfragen (zugangsgeschützt)

## Basisklassen

Die Basisklassen liegen unter ``/app`` und definieren die Entitäten und deren [Relationen](https://laravel.com/docs/5.7/eloquent-relationships). 
Momentan existieren die Basisklassen für Firmen und Produkte. 

## Controller

Die Controller liegen unter ``/app/Http/Controllers``. Die in den Controllern befindlichen Funktionen werden vom Routing aufgerufen 
und liefern entsprechende JSON-Objekte zurück. Dabei wird sich sogenannter Ressourcen bedient, die [Collections](https://laravel.com/docs/5.7/eloquent-collections) von Entitäten zurückgeben.
Momentan existieren Controller für Produkte und für Firmen.

## Ressourcen

Die Ressourcen liegen unter ``app/Http/Resources`` und kapseln die Ausgabe der Entitäten. 
In [Ressourcen](https://laravel.com/docs/5.7/eloquent-resources) wird somit definiert, welche tatsächlichen Eigenschaften der Entitäten an der Schnittstelle verfügbar sind.
Momentan existieren Resourcen für Firmen und Produkte. Die Produkte werden auch von den Firmen gewrapped.

# Release

Da im ``production``-Mode kein webpack-dev-server benutzt wird und entsprechend kein Hot Module Replacement stattfindet, müssen hier die Quellen statisch kompiliert und hinterlegt werden. Dazu folgenden Befehl aufrufen:

```
npm run build
```
