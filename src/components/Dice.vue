<template>
  <div id="ThreeJS" @click="roll" class="dice" />
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import CANNON from "cannon";
import { DiceManager, DiceD6 } from "threejs-dice";

export default {
  data() {
    return {
      renderer: [],
      scene: [],
      camera: [],
      controls: [],
      world: [],
      dice: [],
    };
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      // CAMERA
      var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;
      var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.01,
        FAR = 20000;
      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      this.scene.add(this.camera);
      this.camera.position.set(0, 30, 30);
      // RENDERER
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
      //   this.renderer.shadowMap.enabled = true;
      //   this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      // EVENTS
      // CONTROLS
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // LIGHT
      let ambient = new THREE.AmbientLight("#ffffff", 0.3);
      this.scene.add(ambient);

      //   let directionalLight = new THREE.DirectionalLight("#ffffff", 0.5);
      //   directionalLight.position.x = -1000;
      //   directionalLight.position.y = 1000;
      //   directionalLight.position.z = 1000;
      //   this.scene.add(directionalLight);

      //   let light = new THREE.SpotLight(0xefdfd5, 1.3);
      //   light.position.y = 100;
      //   light.target.position.set(0, 0, 0);
      //   light.castShadow = true;
      //   light.shadow.camera.near = 50;
      //   light.shadow.camera.far = 110;
      //   light.shadow.mapSize.width = 1024;
      //   light.shadow.mapSize.height = 1024;
      //   this.scene.add(light);

      // FLOOR
      //   var floorMaterial = new THREE.MeshPhongMaterial({
      //     color: "#00aa00",
      //     side: THREE.DoubleSide,
      //   });
      //   var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10);
      //   var floor = new THREE.Mesh(floorGeometry, floorMaterial);
      //   floor.receiveShadow = true;
      //   floor.rotation.x = Math.PI / 2;
      //   this.scene.add(floor);

      ////////////
      // CUSTOM //
      ////////////
      this.world = new CANNON.World();

      this.world.gravity.set(0, -9.82 * 20, 0);
      this.world.broadphase = new CANNON.NaiveBroadphase();
      this.world.solver.iterations = 16;

      DiceManager.setWorld(this.world);

      //Floor
      let floorBody = new CANNON.Body({
        mass: 0,
        shape: new CANNON.Plane(),
        material: DiceManager.floorBodyMaterial,
      });
      floorBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        -Math.PI / 2
      );
      this.world.add(floorBody);

      var colors = ["#ff0000", "#ffff00", "#00ff00", "#0000ff", "#ff00ff"];
      for (var i = 0; i < 5; i++) {
        var die = new DiceD6({ size: 1.5, backColor: colors[i] });
        this.scene.add(die.getObject());
        this.dice.push(die);
      }
    },
    roll() {
      var diceValues = [];

      for (var i = 0; i < this.dice.length; i++) {
        let yRand = Math.random() * 20;
        this.dice[i].getObject().position.x = -15 - (i % 3) * 1.5;
        this.dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5;
        this.dice[i].getObject().position.z = -15 + (i % 3) * 1.5;
        this.dice[i].getObject().quaternion.x =
          ((Math.random() * 90 - 45) * Math.PI) / 180;
        this.dice[i].getObject().quaternion.z =
          ((Math.random() * 90 - 45) * Math.PI) / 180;
        this.dice[i].updateBodyFromMesh();
        let rand = Math.random() * 5;
        this.dice[i]
          .getObject()
          .body.velocity.set(25 + rand, 40 + yRand, 15 + rand);
        this.dice[i]
          .getObject()
          .body.angularVelocity.set(
            20 * Math.random() - 10,
            20 * Math.random() - 10,
            20 * Math.random() - 10
          );

        diceValues.push({ dice: this.dice[i], value: i + 1 });
      }

      DiceManager.prepareValues(diceValues);
    },
    //Animate everything
    animate() {
      this.world.step(1.0 / 60.0);

      for (var i in this.dice) {
        this.dice[i].updateMeshFromBody();
      }
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
      requestAnimationFrame(this.animate);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
.dice {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>