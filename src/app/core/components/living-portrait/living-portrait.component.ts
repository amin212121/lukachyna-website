import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Component, ElementRef, OnInit, OnDestroy, ViewChild, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'

@Component({
  selector: 'ly-living-portrait',
  templateUrl: './living-portrait.component.html',
  standalone: true,
})
export class LivingPortraitComponent implements OnInit, OnDestroy {
  @ViewChild('rendererCanvas', { static: true })
  public canvas: ElementRef<HTMLCanvasElement> | undefined

  private renderer: THREE.WebGLRenderer | null = null
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return
    this.createThreeJsBox()
  }

  ngOnDestroy(): void {
    if (this.mouseMoveHandler) {
      document.removeEventListener('mousemove', this.mouseMoveHandler)
    }
    this.renderer?.setAnimationLoop(null)
    this.renderer?.dispose()
  }

  createThreeJsBox(): void {
    if (!this.canvas) return

    const canvas = this.canvas.nativeElement
    const scene = new THREE.Scene()
    const loader = new GLTFLoader()

    // Normalised mouse position (-1 … 1) and smoothed target
    const mouse = { x: 0, y: 0 }
    const smoothed = { x: 0, y: 0 }

    // Bone references
    let leftArm: THREE.Object3D | null = null
    let rightArm: THREE.Object3D | null = null
    let leftForearm: THREE.Object3D | null = null
    let rightForearm: THREE.Object3D | null = null
    let head: THREE.Object3D | null = null
    let spine: THREE.Object3D | null = null

    // Stored base rotations (captured after rest pose is applied)
    const leftArmBase = new THREE.Euler()
    const rightArmBase = new THREE.Euler()
    const leftForearmBase = new THREE.Euler()
    const rightForearmBase = new THREE.Euler()
    const headBase = new THREE.Euler()
    const spineBase = new THREE.Euler()

    loader.load(
      '/3d-models/cartoonguy.glb',
      (gltf) => {
        const model = gltf.scene
        scene.add(model)

        const skeleton = new THREE.SkeletonHelper(model)
        skeleton.visible = false
        scene.add(skeleton)

        console.log(
          '[LivingPortrait] bones:\n' +
            skeleton.bones.map((b, i) => `  [${i}] ${b.name || '(unnamed)'}`).join('\n'),
        )

        model.traverse((obj) => {
          const n = obj.name.toLowerCase()

          // Head – skip end-effectors
          if (!head && n.includes('head') && !n.includes('headend') && !n.includes('headtop')) {
            head = obj
          }

          // Spine – first spine bone for body sway
          if (
            !spine &&
            (n === 'spine' ||
              n === 'mixamorig:spine' ||
              n === 'spine1' ||
              n === 'mixamorig:spine1' ||
              n === 'spine.001')
          ) {
            spine = obj
          }

          // Left upper-arm
          if (!leftArm) {
            const isLeft =
              n === 'mixamorig:leftarm' ||
              n === 'leftarm' ||
              n === 'arm.l' ||
              (n.includes('upperarm') && n.includes('_l')) ||
              (n.includes('arm') && (n.endsWith('.l') || n.endsWith('_l') || n.includes('left')))
            if (isLeft) leftArm = obj
          }

          // Right upper-arm
          if (!rightArm) {
            const isRight =
              n === 'mixamorig:rightarm' ||
              n === 'rightarm' ||
              n === 'arm.r' ||
              (n.includes('upperarm') && n.includes('_r')) ||
              (n.includes('arm') && (n.endsWith('.r') || n.endsWith('_r') || n.includes('right')))
            if (isRight) rightArm = obj
          }

          // Left forearm
          if (!leftForearm) {
            const isLeftForearm =
              n === 'mixamorig:leftforearm' ||
              n === 'leftforearm' ||
              n === 'forearm.l' ||
              (n.includes('forearm') && (n.includes('left') || n.endsWith('.l') || n.endsWith('_l')))
            if (isLeftForearm) leftForearm = obj
          }

          // Right forearm
          if (!rightForearm) {
            const isRightForearm =
              n === 'mixamorig:rightforearm' ||
              n === 'rightforearm' ||
              n === 'forearm.r' ||
              (n.includes('forearm') && (n.includes('right') || n.endsWith('.r') || n.endsWith('_r')))
            if (isRightForearm) rightForearm = obj
          }
        })

        // Index fallback for left arm if name search found nothing
        if (!leftArm) {
          const anchor = skeleton.bones[220]
          const candidate = anchor?.parent?.parent ?? null
          if (candidate) leftArm = candidate
        }

        // ── Apply rest poses ─────────────────────────────────────────
        // Both arms are raised symmetrically as the base, then mouse
        // offsets and dance offsets are layered on top.
        if (leftArm) {
          leftArm.rotation.z = 2   // raise left arm up
          leftArmBase.copy(leftArm.rotation)
        }
        if (rightArm) {
          rightArm.rotation.z = -2  // mirror: raise right arm up
          rightArmBase.copy(rightArm.rotation)
        }
        if (leftForearm) {
          leftForearmBase.copy(leftForearm.rotation)
        }
        if (rightForearm) {
          rightForearmBase.copy(rightForearm.rotation)
        }
        if (head) {
          headBase.copy(head.rotation)
        }
        if (spine) {
          spineBase.copy(spine.rotation)
        }
      },
      undefined,
      (error) => console.error(error),
    )

    // ── Mouse tracking ─────────────────────────────────────────────
    this.mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1    // left → -1, right → +1
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1) // top  → +1, bottom → -1
    }
    document.addEventListener('mousemove', this.mouseMoveHandler, { passive: true })

    // ── Scene setup ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(2, 2, 2)
    scene.add(pointLight)

    const canvasSizes = { width: 320, height: 540 }

    const camera = new THREE.PerspectiveCamera(50, canvasSizes.width / canvasSizes.height, 1, 100)
    camera.position.set(0, 2, 3)
    camera.lookAt(0, 1, 0)
    scene.add(camera)

    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    this.renderer.setSize(canvasSizes.width, canvasSizes.height)

    // ── Animation loop ─────────────────────────────────────────────
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let time = 0
    let idlePhase = 0       // very slow, for gentle idle sway
    let prevScrollY = window.scrollY
    let scrollActivity = 0  // 0 = idle/mouse mode, 1 = full dance

    this.renderer.setAnimationLoop(() => {
      time += 0.016
      idlePhase += 0.006    // ~0.36°/frame — slow idle drift

      // Ease mouse
      smoothed.x = lerp(smoothed.x, mouse.x, 0.05)
      smoothed.y = lerp(smoothed.y, mouse.y, 0.05)

      // ── Scroll detection ───────────────────────────────────────
      const curScrollY = window.scrollY
      const scrollDelta = Math.abs(curScrollY - prevScrollY)
      prevScrollY = curScrollY
      // Spike to 1 quickly when scrolling, decay ~1 s when idle
      scrollActivity =
        scrollDelta > 0.5
          ? Math.min(1, scrollActivity + 0.15)
          : Math.max(0, scrollActivity - 0.015)
      const dance = scrollActivity

      // ── Shared oscillators ─────────────────────────────────────
      const beat      = Math.sin(time * 6)          // fast beat for dance wave
      const beatOff   = Math.sin(time * 6 + Math.PI) // opposite phase
      const sway      = Math.sin(idlePhase)          // slow idle sway
      const breathe   = Math.sin(time * 1.5) * (0.018 + dance * 0.05)

      // ── Left arm ──────────────────────────────────────────────
      if (leftArm) {
        // Idle: follows mouse + gentle sway
        const restX = leftArmBase.x + smoothed.y * 0.45 + sway * 0.03
        const restZ = leftArmBase.z + smoothed.x * 0.4  + sway * 0.04
        // Dance: arm raises higher and waves forward/back aggressively
        const danceX = leftArmBase.x - 1.0 + beat * 0.45
        const danceZ = leftArmBase.z + 0.5 + Math.sin(time * 4 + 0.8) * 0.2
        leftArm.rotation.x = lerp(restX, danceX, dance) + breathe
        leftArm.rotation.z = lerp(restZ, danceZ, dance)
      }

      // ── Right arm (opposite phase = alternating wave) ──────────
      if (rightArm) {
        // Idle: mouse mirrored + gentle sway
        const restX = rightArmBase.x + smoothed.y * 0.45 + sway * 0.03
        const restZ = rightArmBase.z - smoothed.x * 0.4  - sway * 0.04
        // Dance: perfectly out-of-phase with left arm
        const danceX = rightArmBase.x - 1.0 + beatOff * 0.45
        const danceZ = rightArmBase.z - 0.5 - Math.sin(time * 4 + 0.8) * 0.2
        rightArm.rotation.x = lerp(restX, danceX, dance) + breathe
        rightArm.rotation.z = lerp(restZ, danceZ, dance)
      }

      // ── Left forearm — wrist curl adds expressiveness ──────────
      if (leftForearm) {
        const restY  = leftForearmBase.y
        const danceY = leftForearmBase.y + Math.sin(time * 6 + 1.2) * 0.55
        leftForearm.rotation.y = lerp(restY, danceY, dance * 0.85)
      }

      // ── Right forearm ──────────────────────────────────────────
      if (rightForearm) {
        const restY  = rightForearmBase.y
        const danceY = rightForearmBase.y + Math.sin(time * 6 + 1.2 + Math.PI) * 0.55
        rightForearm.rotation.y = lerp(restY, danceY, dance * 0.85)
      }

      // ── Spine / body sway ──────────────────────────────────────
      if (spine) {
        // Idle: very subtle lean with mouse
        const restY  = spineBase.y + smoothed.x * 0.05 + sway * 0.03
        // Dance: body rocks side to side at half the beat frequency
        const danceY = spineBase.y + Math.sin(time * 3) * 0.07
        const danceZ = spineBase.z + Math.sin(time * 6 + Math.PI * 0.5) * 0.03
        spine.rotation.y = lerp(restY, danceY, dance)
        spine.rotation.z = lerp(spineBase.z, danceZ, dance)
      }

      // ── Head: look-at + dance bob ──────────────────────────────
      if (head) {
        const restY  = headBase.y + smoothed.x * 0.3
        const restX  = headBase.x - smoothed.y * 0.15
        // Head bobs on opposite axis from arms (nods yes while arms wave)
        const danceY = headBase.y + Math.sin(time * 3) * 0.14
        const danceX = headBase.x + Math.sin(time * 6 + Math.PI * 0.4) * 0.07
        head.rotation.y = lerp(restY, danceY, dance * 0.65)
        head.rotation.x = lerp(restX, danceX, dance * 0.65)
      }

      this.renderer!.render(scene, camera)
    })
  }
}