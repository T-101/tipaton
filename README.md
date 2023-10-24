## Tipaton Tammikuu

### "sillä lailla"

Jos tulee tarvetta aloittaa määrämittainen 31pv tipaton
muuna aikana kuin tammikuun ensimmäisenä,
voi urliin lisätä parametrin ?start=[numero] jolloin
päiviä joko lisätään tai vähennetään

Esim: https://saako.ottaa.biss.ee/?start=-8,
jolloin tipattoman laskeminen alkaa jo jouluaattona.

tai: https://saako.ottaa.biss.ee/?start=7
jolloin tipaton alkaa loppiaisen jälkeen

---

#### Run dev locally:
    $ docker compose up

#### Build production files
    $ docker compose run --rm app sh
    $ cd /frontend
    $ npm run build