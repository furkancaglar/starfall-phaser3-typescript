import "phaser";

export default class GameScene extends Phaser.Scene {
    imgKeySky: string;
    imgPathSky: string;
    imgKeySand: string;
    imgPathSand: string;
    imgKeyStar: string;
    imgPathStar: string;

    delta: number;
    lastStarTime: number;
    starsCaught: number;
    starsFallen: number;
    sand: Phaser.Physics.Arcade.StaticGroup;
    info: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: 'GameScene'
        });
    }
    init(params): void {
        this.imgKeySky = 'sky';
        this.imgPathSky = 'assets/img/sky.png';
        this.imgKeySand = 'sand';
        this.imgPathSand = 'assets/img/sand.jpg';
        this.imgKeyStar = 'star';
        this.imgPathStar = 'assets/img/star.png';

        this.delta = 1000;
        this.lastStarTime = 0;
        this.starsCaught = 0;
        this.starsFallen = 0;
    }
    preload(): void {
        this.load.image(this.imgKeySky, this.imgPathSky);
        this.load.image(this.imgKeySand, this.imgPathSand);
        this.load.image(this.imgKeyStar, this.imgPathStar);
    }

    create(): void {
        this.add.image(400, 300, this.imgKeySky);

        this.sand = this.physics.add.staticGroup({
            key: this.imgKeySand,
            frameQuantity: 20
        });

        Phaser.Actions.PlaceOnLine(this.sand.getChildren(),
            new Phaser.Geom.Line(20, 580, 820, 580));
        this.sand.refresh();
        this.info = this.add.text(10, 10, '0 caught - 0 fallen (max 3)',
            { font: '24px Arial Bold', color: '#FBFBAC' });


    }
    update(time: number): void {
        var diff: number = time - this.lastStarTime;
        if (diff > this.delta) {
            this.lastStarTime = time;
            if (this.delta > 500) {
                this.delta -= 20;
            }
            this.emitStar();
        }
        this.info.text =
            this.starsCaught + " caught - " +
            this.starsFallen + " fallen (max 3)";
    }
    private onClick(star: Phaser.Physics.Arcade.Image): () => void {
        return function () {
            star.setTint(0x00ff00);
            star.setVelocity(0, 0);
            this.starsCaught += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
            }, [star], this);
        }
    }
    private onFall(star: Phaser.Physics.Arcade.Image): () => void {
        return function () {
            star.setTint(0xff0000);
            this.starsFallen += 1;
            this.time.delayedCall(100, function (star) {
                star.destroy();
                if (this.starsFallen > 2) {
                    this.scene.start("ScoreScene",
                        { starsCaught: this.starsCaught });
                }
            }, [star], this);
        }
    }
    private emitStar(): void {
        let star: Phaser.Physics.Arcade.Image;
        const x = Phaser.Math.Between(25, 775);
        const y = 26;
        star = this.physics.add.image(x, y, this.imgKeyStar);
        star.setDisplaySize(50, 50);
        star.setVelocity(0, 150);
        star.setInteractive();
        star.on('pointerdown', this.onClick(star), this);
        this.physics.add.collider(star, this.sand,
            this.onFall(star), null, this);
    }
};
