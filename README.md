# Halo-Api
Personal Express API to make using the Halo 5 API easier.

# Live Version
A live version is hosted on haloapi.nicmeister.cloud

## How To:
Simply do a REST API POST call with the below body to
> haloapi.nicmeister.cloud
```json 
{
	"gamertag": "Final Necessity",
	"token": "{{ YOUR API KEY }}"
}
```

## Response
```json
{
  "Gamertag": "Final Necessity",
  "Xp": 11437976,
  "SpartanRank": 147,
  "HighestCsrAttained": {
    "Tier": 1,
    "DesignationId": 7,
    "Csr": 1893,
    "PercentToNextTier": 0,
    "Rank": 146
  },
  "Stats": {
    "TotalKills": 36668,
    "TotalHeadshots": 18849,
    "TotalMeleeKills": 3647,
    "TotalAssassinations": 806,
    "TotalGroundPoundKills": 120,
    "TotalShoulderBashKills": 679,
    "TotalPowerWeaponKills": 9550,
    "TotalDeaths": 30281,
    "TotalAssists": 11095,
    "TotalGamesCompleted": 2520,
    "TotalGamesWon": 1275,
    "TotalGamesLost": 1225,
    "TotalGamesTied": 20,
    "TotalGrenadeKills": 1589,
    "TotalSpartanKills": 36568
  },
  "TotalTimePlayed": "P12DT8H3M33.5068685S"
}
```