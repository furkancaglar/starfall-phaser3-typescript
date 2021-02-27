import * as Phaser from 'phaser';

import GameScene from './GameScene';

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

    scene: [GameScene],

    parent: 'game',
    backgroundColor: '#000033',
};

export const game = new Phaser.Game(gameConfig);
