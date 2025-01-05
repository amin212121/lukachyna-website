import * as THREE from 'three';
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

    const material = new THREE.MeshToonMaterial();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.x = 2;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

    const box = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), material);

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(5, 1.5, 16, 100),
      material
    );

    scene.add(torus, box);

    const canvasSizes = {
      width: 500,
      height: 300,
    };

    const camera = new THREE.PerspectiveCamera(
      75,
      canvasSizes.width / canvasSizes.height,
      0.001,
      1000
    );
    camera.position.z = 30;
    scene.add(camera);

    if (!canvas) {
      return;
    }

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

    const clock = new THREE.Clock();

    const animateGeometry = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update animaiton objects
      box.rotation.x = elapsedTime;
      box.rotation.y = elapsedTime;
      box.rotation.z = elapsedTime;

      torus.rotation.x = -elapsedTime;
      torus.rotation.y = -elapsedTime;
      torus.rotation.z = -elapsedTime;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(animateGeometry);
    };

    animateGeometry();
  }
}

