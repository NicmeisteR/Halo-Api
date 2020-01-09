// ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
// ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
// ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
// ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
// ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
// ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
// Imports
import { Player } from '../models/player';

// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// Functions
export async function stats(player: Player) {

    let root = {
        Gamertag: player.Results[0].Result.PlayerId.Gamertag,
        Xp: player.Results[0].Result.Xp,
        SpartanRank: player.Results[0].Result.SpartanRank,
        HighestCsrAttained: {
            Tier: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Tier,
            DesignationId: player.Results[0].Result.ArenaStats.HighestCsrAttained?.DesignationId,
            Csr: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Csr,
            PercentToNextTier: player.Results[0].Result.ArenaStats.HighestCsrAttained?.PercentToNextTier,
            Rank: player.Results[0].Result.ArenaStats.HighestCsrAttained?.Rank,
        },
        Stats: {
            TotalKills: player.Results[0].Result.ArenaStats.TotalKills,
            TotalHeadshots: player.Results[0].Result.ArenaStats.TotalHeadshots,
            TotalMeleeKills: player.Results[0].Result.ArenaStats.TotalMeleeKills,
            TotalAssassinations: player.Results[0].Result.ArenaStats.TotalAssassinations,
            TotalGroundPoundKills: player.Results[0].Result.ArenaStats.TotalGroundPoundKills,
            TotalShoulderBashKills: player.Results[0].Result.ArenaStats.TotalShoulderBashKills,
            TotalPowerWeaponKills: player.Results[0].Result.ArenaStats.TotalPowerWeaponKills,
            TotalDeaths: player.Results[0].Result.ArenaStats.TotalDeaths,
            TotalAssists: player.Results[0].Result.ArenaStats.TotalAssists,
            TotalGamesCompleted: player.Results[0].Result.ArenaStats.TotalGamesCompleted,
            TotalGamesWon: player.Results[0].Result.ArenaStats.TotalGamesWon,
            TotalGamesLost: player.Results[0].Result.ArenaStats.TotalGamesLost,
            TotalGamesTied: player.Results[0].Result.ArenaStats.TotalGamesTied,
            TotalGrenadeKills: player.Results[0].Result.ArenaStats.TotalGrenadeKills,
            TotalSpartanKills: player.Results[0].Result.ArenaStats.TotalSpartanKills,
        },
        TotalTimePlayed: player.Results[0].Result.ArenaStats.TotalTimePlayed,
    };

    return new Promise((resolve, reject) => {
        resolve(root);
    });
}