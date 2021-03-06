Attack Portal Suggestion Plugin
===============================

iitc: attack portal suggestion
------------------------------
Plugin pro skript [Ingress Intel Total Conversion](https://github.com/breunigs/ingress-intel-total-conversion), který umožnuje zobrazovat přehled portálů s ohledem na jejich energii a potencionální zisk AP.

Instalace
---------
Stejně jako ostatní pluginy, stačí přípdat jak skript do Greasemonkey nebo Tampermonkey.
* V případě že máte některé z těchto rozšíření, stačí [kliknout sem](https://raw.github.com/jenscz/attack-portal-suggestion/master/attack-portal-suggestion.user.js).

Použití
-------
V "portálovém menu" se úplně dole zobrazí odkaz `A@!` (viz screenshot).

![Screenshot menu](https://raw.github.com/jenscz/attack-portal-suggestion/master/screenshot_menu.png)

Měla by se vám zobrazit tabulka (dialog) se seznamem portálů, jejich energie a možného bodového (AP) zisku za **zničení rezonátorů, linků a fieldů** (ne za deploy). Viz screenshot níže.

Výsledna hodnota, podle které je seznam seřazen je vypočtena jako "zbývající energie portálu / AP zisk za zničení rezonátorů, linků a fieldů". Čím nižší je tento poměr je, tím "levněji" AP získáte.

Pokud kliknete na portál v seznamu, měl by se vycentrovat na mapě a vybrat.

![Screenshot dialog](https://raw.github.com/jenscz/attack-portal-suggestion/master/screenshot_dialog.png)

Informace o portálech si udržuje plugin perzistetně i při přechodu na jinou část mapy, pro smazanání těchto dat je třeba udělat refresh celé stránky.

TODO
----
* Lepší zobrazovací dialog.
* Upravit výpočet na základě vzdálenosti rezonátorů od portálu.
