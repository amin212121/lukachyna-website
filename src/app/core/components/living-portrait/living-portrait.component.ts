import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'ly-living-portrait',
  templateUrl: './living-portrait.component.html',
  standalone: true
})

export class LivingPortraitComponent implements OnInit {
  @ViewChild('rendererCanvas', {static: true})
  public canvas: ElementRef<HTMLCanvasElement> | undefined;

  public ngOnInit(): void {
    this.createThreeJsBox();
  }

  createThreeJsBox(): void {
    if (!this.canvas) return;

    const canvas = this.canvas.nativeElement;
    const scene = new THREE.Scene();
    const loader = new GLTFLoader();
    let model, skeleton;

    loader.load('/3d-models/cartoonguy.glb', function (gltf) {
      model = gltf.scene;

      scene.add(model);


      skeleton = new THREE.SkeletonHelper( model );
      skeleton.visible = false

      if(skeleton.bones[220].parent?.parent?.parent){
        skeleton.bones[220].parent.parent.rotation.z = 2
      }
      scene.add( skeleton );
    }, undefined, function (error) {
      console.error(error);
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

    const canvasSizes = {
      width: 500,
      height: 300,
    };

    const camera = new THREE.PerspectiveCamera(
      50,
      canvasSizes.width / canvasSizes.height,
      1,
      100
    );
    camera.position.set( 0, 2, 3 );
    camera.lookAt( 0, 1, 0 );
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
    });
    renderer.setClearColor(0xe232222, 1);
    renderer.setSize(canvasSizes.width, canvasSizes.height);

    /*window.addEventListener('resize', () => {
      canvasSizes.width = window.innerWidth;
      canvasSizes.height = window.innerHeight;

      camera.aspect = canvasSizes.width / canvasSizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(canvasSizes.width, canvasSizes.height);
      renderer.render(scene, camera);
    });*/

    renderer.setAnimationLoop(() => renderer.render(scene, camera))
  }
}

