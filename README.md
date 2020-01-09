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
  "token": "{{ YOUR API KEY }}",
  "query": "Arena" // Current Options: ["Arena", "Ranks"]
}
```

## Response - Arena
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

## Response - Ranks
```json
[
  {
    "Name": "Slayer ",
    "TotalKills": 58,
    "TotalDeaths": 80,
    "TotalTimePlayed": {
      "sign": "+",
      "years": 0,
      "months": 0,
      "weeks": 0,
      "days": 0,
      "hours": 0,
      "minutes": "49",
      "seconds": "30.1837709"
    },
    "TotalGamesWon": 3,
    "TotalGamesLost": 3,
    "Csr": null,
    "Designation": {
      "name": "Unranked",
      "bannerImageUrl": "https://content.halocdn.com/media/Default/games/halo-5-guardians/csr/csr_banners_array00-545c87cd1d6b423cb1995e824a2cab6c.png",
      "iconImageUrl": "https://content.halocdn.com/media/Default/games/halo-5-guardians/csr/csr_unranked_array06-6416017745164c6a9d956933023a4440.png"
    },
    "MeasurementMatchesLeft": 4
  },
  {
    "Name": "Mythic Arena",
    "TotalKills": 2509,
    "TotalDeaths": 2856,
    "TotalTimePlayed": {
      "sign": "+",
      "years": 0,
      "months": 0,
      "weeks": 0,
      "days": "1",
      "hours": "5",
      "minutes": "59",
      "seconds": "31.3659345"
    },
    "TotalGamesWon": 113,
    "TotalGamesLost": 117,
    "Csr": {
      "Tier": 6,
      "DesignationId": 4,
      "Csr": 0,
      "PercentToNextTier": 92,
      "Rank": null
    },
    "Designation": {
      "name": "Platinum",
      "bannerImageUrl": "https://content.halocdn.com/media/Default/games/halo-5-guardians/csr/csr_banners_array04-0cc773f4ed35428795df9ffc3b72f96a.png",
      "iconImageUrl": "https://content.halocdn.com/media/Default/games/halo-5-guardians/csr/csr_platinum_array06-05c733f15d1b4101ba2b04d1eb56df63.png"
    },
    "MeasurementMatchesLeft": 0
  }
]
```
# Setup

## Build
Run
> npm run build

## Start
Run 
> npm start

## Test
Run
> npm test