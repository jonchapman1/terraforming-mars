
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SelectSpace } from "../inputs/SelectSpace";
import { SpaceType } from "../SpaceType";

export class ArtificialLake implements IProjectCard {
    public cost: number = 15;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Artificial Lake";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Requires -6C or warmer. Place 1 ocean tile on an area not reserved for ocean. Gain 1 victory point.";
    public description: string = "Landscaping is as natural as terraforming.";
    public play(player: Player, game: Game): Promise<void> {
        if (game.getTemperature() < -6) {
            return Promise.reject("Requires -6C or warmer");
        }
        return new Promise((resolve, reject) => {
            player.setWaitingFor(new SelectSpace(this, "Select a land space to place an ocean"), (options: {[x: string]: string}) => {
                const foundSpace = game.getSpace(options.option1);
                if (foundSpace === undefined) {
                    reject("Space not found");
                    return;
                }
                if (foundSpace.spaceType !== SpaceType.LAND) {
                    reject("Must select ocean on an area not reserved for ocean");
                    return;
                }
                try { game.addOceanTile(player, foundSpace.id); }
                catch (err) { reject(err); return; }
                player.victoryPoints++;
                resolve();
            });
        });
    }
}
