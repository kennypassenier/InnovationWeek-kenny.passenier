# InnovationWeek-kenny.passenier

Speel yahtzee op een website door echte dobbelstenen te werpen en die via een Raspberry Pi te fotograferen.

In de map raspberry vindt je de code terug voor de webserver die standaard moet draaien op de Raspberry Pi.
Via ngrok wordt er automatisch een tunnel gecreëerd zodat je vanop elke locatie/internetconfiguratie kunt communiceren met de Raspberry Pi.
Ngrok-notify zorgt ervoor dat het adres van die tunnel naar een vooropgesteld email adres wordt verzonden. 

Dan surf je naar de website/draai je lokaal het bestand yahtzee.html en kopieer je het ngrok adres om verbinding te maken.
Dan kan je beginnen met het spel. 

-----------------

In het bestand credentials.txt staan alle gegevens om in te loggen op benodigde accounts.
In het bestand RPi commands.txt staan de gebruikte commando's die nodig zijn om alle software op de Raspberry Pi in te stellen.

Referenties: 

OpenCV3 installatie voor op de Raspberry Pi:
- https://www.pyimagesearch.com/2017/09/04/raspbian-stretch-install-opencv-3-python-on-your-raspberry-pi/

Ngrok:
-  https://thisdavej.com/how-to-host-a-raspberry-pi-web-server-on-the-internet-with-ngrok/

Het script voor de herkenning van de dobbelstenen: 
- https://github.com/andli/dicecounter/blob/master/count.py
Dit heb ik wel moeten aanpassen, om de juiste instellingen te bekomen, en om het te integreren in de flask webserver.