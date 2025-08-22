import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
// Removed unused imports

const GameBackground = () => {
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
      parent: 'phaser-background',
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    let player, cursors, projectiles, aliens;
    let shootCooldown = false;

    function preload() {
      // Create textures without leaving visual artifacts
      const graphics = this.add.graphics({ x: -1000, y: -1000 }); // Position off-screen
      
      // Player texture
      graphics.fillStyle(0x2c3e50);
      graphics.fillRect(0, 0, 24, 24);
      graphics.generateTexture('player', 24, 24);
      graphics.clear();
      
      // Alien texture
      graphics.fillStyle(0x95a5a6);
      graphics.fillRect(0, 0, 20, 20);
      graphics.generateTexture('alien', 20, 20);
      graphics.clear();
      
      // Projectile texture
      graphics.fillStyle(0x34495e);
      graphics.fillRect(0, 0, 3, 8);
      graphics.generateTexture('projectile', 3, 8);
      graphics.clear();
      
      // Explosion texture
      graphics.fillStyle(0xbdc3c7);
      graphics.fillCircle(6, 6, 6);
      graphics.generateTexture('explosion', 12, 12);
      
      // Remove the graphics object
      graphics.destroy();
    }

    function create() {
      // Player setup with better positioning and more visible styling
      player = this.physics.add.sprite(config.width / 2, config.height - 100, 'player');
      player.setCollideWorldBounds(true);
      player.setScale(1.2); // Make it slightly larger and more visible

      projectiles = this.physics.add.group();
      aliens = this.physics.add.group();

      this.physics.add.collider(projectiles, aliens, hitAlien, null, this);

      cursors = this.input.keyboard.createCursorKeys();
      const space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

      // Remove score and instructions - keep it clean

      // Add WASD controls
      const wasd = this.input.keyboard.addKeys('W,S,A,D');
      cursors.wasd = wasd;

      // Slower, more subtle alien spawning
      this.time.addEvent({ 
        delay: 2000, // Slower spawn rate
        callback: spawnAlien,
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

      // Score removed for cleaner aesthetic
      
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
      proj.setVelocityY(-400);
      shootCooldown = true;
      setTimeout(() => (shootCooldown = false), 300); // Moderate shooting speed
    }

    function spawnAlien() {
      const alien = aliens.create(
        Phaser.Math.Between(50, config.width - 50), 
        -30, 
        'alien'
      );
      // Slower, more subtle movement
      const speed = Phaser.Math.Between(60, 120);
      alien.setVelocityY(speed);
      
      // Occasional horizontal movement
      if (Math.random() > 0.8) {
        alien.setVelocityX(Phaser.Math.Between(-80, 80));
      }
    }

    function hitAlien(proj, alien) {
      const hitX = alien.x;
      const hitY = alien.y;
      
      proj.destroy();
      alien.destroy();
      
      // Subtle explosion effect
      const explosion = this.add.sprite(hitX, hitY, 'explosion');
      explosion.setScale(1.5);
      
      // Gentle fade animation
      this.tweens.add({
        targets: explosion,
        scaleX: 0.2,
        scaleY: 0.2,
        alpha: 0,
        duration: 400,
        ease: 'Power2',
        onComplete: () => explosion.destroy()
      });
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
