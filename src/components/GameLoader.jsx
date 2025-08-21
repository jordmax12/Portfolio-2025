import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { projects } from '../data/projects'; // Reference data

const GameLoader = ({ onComplete }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: { default: 'arcade', arcade: { gravity: { y: 200 } } },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
      transparent: true,
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    let player, cursors, projectiles, aliens, scoreText, score = 0;
    let shootCooldown = false;

    function preload() {
      // Load assets (add your images/sounds to public/assets/)
      this.load.image('player', 'assets/player.png'); // Placeholder; add real
      this.load.image('alien', 'assets/alien.png');
      this.load.image('projectile', 'assets/projectile.png');
    }

    function create() {
      player = this.physics.add.sprite(config.width / 2, 50, 'player').setScale(0.5);
      player.setCollideWorldBounds(true);

      projectiles = this.physics.add.group();
      aliens = this.physics.add.group();

      this.physics.add.collider(projectiles, aliens, hitAlien, null, this);

      cursors = this.input.keyboard.createCursorKeys();
      const space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', fill: '#fff' });

      // Spawn aliens
      this.time.addEvent({ delay: 1000, callback: spawnAlien, loop: true });

      // Skip button (React overlay)
      // Note: Add a React button outside Phaser for skip
    }

    function update() {
      player.setVelocityX(0);
      if (cursors.left.isDown) player.setVelocityX(-300);
      if (cursors.right.isDown) player.setVelocityX(300);
      if (cursors.up.isDown && player.body.touching.down) player.setVelocityY(-300);
      if (cursors.space.isDown) shoot();

      // Auto-complete example: if (score > 5) onComplete();
    }

    function shoot() {
      if (shootCooldown) return;
      const proj = projectiles.create(player.x, player.y, 'projectile').setVelocityY(-400);
      shootCooldown = true;
      setTimeout(() => (shootCooldown = false), 300);
    }

    function spawnAlien() {
      const alien = aliens.create(Phaser.Math.Between(0, config.width), 0, 'alien').setVelocityY(100);
    }

    function hitAlien(proj, alien) {
      proj.destroy();
      alien.destroy();
      score += 1;
      scoreText.setText(`Score: ${score}`);
      // Unlock project: Alert or modal with random project data
      const projData = projects[Math.floor(Math.random() * projects.length)];
      alert(`Unlocked: ${projData.title}\n${projData.description}`); // Replace with modal
    }

    // Resize listener
    const resize = () => game.scale.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', resize);

    // Cleanup
    return () => {
      game.destroy(true);
      window.removeEventListener('resize', resize);
    };
  }, [onComplete]);

  return (
    <div id="phaser-container" className="relative">
      <button className="absolute bottom-4 right-4 px-4 py-2 bg-white text-black rounded" onClick={onComplete}>
        Skip to Portfolio
      </button>
    </div>
  );
};

export default GameLoader;
