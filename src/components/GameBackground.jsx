import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { projects } from '../data/projects'; // Not used for unlocks now

const GameBackground = () => {
  const gameRef = useRef(null);
  const scoreRef = useRef(0);
  const scoreTextRef = useRef(null);

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
      parent: 'phaser-background',
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    let player, cursors, projectiles, aliens;
    let shootCooldown = false;

    function preload() {
      // Create simple colored rectangles as placeholders
      this.add.graphics().fillStyle(0x00f5ff).fillRect(0, 0, 32, 32).generateTexture('player', 32, 32);
      this.add.graphics().fillStyle(0xff4444).fillRect(0, 0, 24, 24).generateTexture('alien', 24, 24);
      this.add.graphics().fillStyle(0x00ffff).fillRect(0, 0, 4, 12).generateTexture('projectile', 4, 12);
      this.add.graphics().fillStyle(0xffff00).fillCircle(8, 8, 8).generateTexture('explosion', 16, 16);
    }

    function create() {
      // Player setup with better positioning
      player = this.physics.add.sprite(config.width / 2, config.height - 60, 'player');
      player.setCollideWorldBounds(true);
      player.setTint(0x00f5ff); // Cyan glow

      projectiles = this.physics.add.group();
      aliens = this.physics.add.group();

      this.physics.add.collider(projectiles, aliens, hitAlien, null, this);

      cursors = this.input.keyboard.createCursorKeys();
      const space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // Enhanced UI
      scoreTextRef.current = this.add.text(20, 20, 'SCORE: 0', { 
        fontSize: '20px', 
        fill: '#00f5ff',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 3
      });

      // Game instructions with gaming style
      this.add.text(config.width - 20, 20, 'WASD/ARROWS: MOVE | SPACE: FIRE', { 
        fontSize: '14px', 
        fill: '#00f5ff',
        fontFamily: 'Arial, sans-serif',
        fontStyle: 'bold',
        stroke: '#000',
        strokeThickness: 2,
        align: 'right'
      }).setOrigin(1, 0);

      // Add WASD controls
      const wasd = this.input.keyboard.addKeys('W,S,A,D');
      cursors.wasd = wasd;

      // Dynamic alien spawning - gets faster over time
      this.alienSpawnRate = 1500;
      this.time.addEvent({ 
        delay: this.alienSpawnRate, 
        callback: () => {
          spawnAlien();
          // Increase difficulty over time
          if (this.alienSpawnRate > 400) {
            this.alienSpawnRate -= 10;
          }
        }, 
        loop: true 
      });
    }

    function update() {
      // Enhanced movement with WASD and arrow keys
      player.setVelocity(0);
      
      // Horizontal movement
      if (cursors.left.isDown || cursors.wasd.A.isDown) {
        player.setVelocityX(-350);
      }
      if (cursors.right.isDown || cursors.wasd.D.isDown) {
        player.setVelocityX(350);
      }
      
      // Vertical movement (full 2D movement)
      if (cursors.up.isDown || cursors.wasd.W.isDown) {
        player.setVelocityY(-350);
      }
      if (cursors.down.isDown || cursors.wasd.S.isDown) {
        player.setVelocityY(350);
      }
      
      // Shooting
      if (cursors.space.isDown) {
        shoot();
      }

      // Update score with enhanced styling
      scoreTextRef.current.setText(`SCORE: ${scoreRef.current}`);
      
      // Clean up projectiles that go off screen
      projectiles.children.entries.forEach(projectile => {
        if (projectile.y < -50) {
          projectile.destroy();
        }
      });
      
      // Clean up aliens that go off screen
      aliens.children.entries.forEach(alien => {
        if (alien.y > config.height + 50) {
          alien.destroy();
        }
      });
    }

    function shoot() {
      if (shootCooldown) return;
      const proj = projectiles.create(player.x, player.y - 20, 'projectile');
      proj.setVelocityY(-500);
      proj.setTint(0x00ffff); // Cyan projectiles
      shootCooldown = true;
      setTimeout(() => (shootCooldown = false), 200); // Faster shooting
    }

    function spawnAlien() {
      const alien = aliens.create(
        Phaser.Math.Between(50, config.width - 50), 
        -30, 
        'alien'
      );
      // Vary alien speed and movement patterns
      const speed = Phaser.Math.Between(80, 150);
      alien.setVelocityY(speed);
      alien.setTint(0xff4444); // Red aliens
      
      // Some aliens move horizontally too
      if (Math.random() > 0.7) {
        alien.setVelocityX(Phaser.Math.Between(-100, 100));
      }
    }

    function hitAlien(proj, alien) {
      const hitX = alien.x;
      const hitY = alien.y;
      
      proj.destroy();
      alien.destroy();
      scoreRef.current += 10;
      
      // Enhanced explosion effect
      const explosion = this.add.sprite(hitX, hitY, 'explosion');
      explosion.setTint(0xffff00);
      explosion.setScale(2);
      
      // Animate explosion
      this.tweens.add({
        targets: explosion,
        scaleX: 0,
        scaleY: 0,
        alpha: 0,
        duration: 300,
        ease: 'Power2',
        onComplete: () => explosion.destroy()
      });
      
      // Screen shake effect
      this.cameras.main.shake(100, 0.01);
    }

    // Resize
    const resize = () => game.scale.resize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', resize);

    return () => {
      game.destroy(true);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <div id="phaser-background" className="absolute top-0 left-0 w-full h-full z-10 pointer-events-auto" />;
};

export default GameBackground;
