import * as Phaser from 'phaser';

import GameScene from './GameScene';
import WelcomeScene from "./WelcomeScene";
import ScoreScene from "./ScoreScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Sample',

    type: Phaser.AUTO,

    scale: {
        width: 800,
        height: 600,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },

    scene: [WelcomeScene ,GameScene, ScoreScene],

    parent: 'game',
    backgroundColor: '#000033',
};

export const game = new Phaser.Game(gameConfig);
