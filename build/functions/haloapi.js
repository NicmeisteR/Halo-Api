"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
// ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
// Functions
function stats(player) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        let root = {
            Gamertag: player.Results[0].Result.PlayerId.Gamertag,
            Xp: player.Results[0].Result.Xp,
            SpartanRank: player.Results[0].Result.SpartanRank,
            HighestCsrAttained: {
                Tier: (_a = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _a === void 0 ? void 0 : _a.Tier,
                DesignationId: (_b = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _b === void 0 ? void 0 : _b.DesignationId,
                Csr: (_c = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _c === void 0 ? void 0 : _c.Csr,
                PercentToNextTier: (_d = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _d === void 0 ? void 0 : _d.PercentToNextTier,
                Rank: (_e = player.Results[0].Result.ArenaStats.HighestCsrAttained) === null || _e === void 0 ? void 0 : _e.Rank,
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
    });
}
exports.stats = stats;
