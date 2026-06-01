"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float wave =
      sin(pos.x * 3.0 + uTime * 0.7) * 0.02 +
      cos(pos.y * 4.0 + uTime * 0.5) * 0.02;
    pos.z += wave;

    float d = distance(uv, uMouse * 0.5 + 0.5);
    pos.z += smoothstep(0.45, 0.0, d) * 0.16 * uHover;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform float uTime;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 dir = uv - 0.5;

    float amt = 0.0022 + uHover * 0.005 + length(dir) * 0.003;
    float r = texture2D(uTex, uv - dir * amt).r;
    vec4  g = texture2D(uTex, uv);
    float b = texture2D(uTex, uv + dir * amt).b;
    vec3 col = vec3(r, g.g, b);

    // duotone: lift toward warm bone in highlights, crush to ink in shadows
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    vec3 ink  = vec3(0.043, 0.043, 0.051);
    vec3 bone = vec3(0.956, 0.941, 0.902);
    vec3 duo  = mix(ink, bone, smoothstep(0.05, 0.95, lum));
    col = mix(col, duo, 0.32);

    float grain = fract(sin(dot(uv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.045;

    float vig = smoothstep(1.05, 0.2, length(dir));
    col *= mix(0.72, 1.0, vig);

    gl_FragColor = vec4(col, g.a);
  }
`;

function Portrait() {
  const tex = useTexture("/daphni_portrait.png");
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const hover = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
    }),
    [tex]
  );

  useFrame((state) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;
    mouse.current.set(state.pointer.x, state.pointer.y);
    m.uniforms.uMouse.value.lerp(mouse.current, 0.05);
    hover.current += (1 - hover.current) * 0.04;
    m.uniforms.uHover.value = hover.current;

    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, state.pointer.x * 0.1, 0.04);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -state.pointer.y * 0.1, 0.04);
    }
  });

  // square portrait, fit to the (portrait-oriented) frame
  const size = Math.min(viewport.width, viewport.height) * 0.96;

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[size, size, 40, 40]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
      />
    </mesh>
  );
}

export default function HeroCanvas({
  onReady,
  onLost,
}: {
  onReady?: () => void;
  onLost?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
      camera={{ position: [0, 0, 6], fov: 40 }}
      style={{ width: "100%", height: "100%" }}
      onCreated={({ gl }) => {
        onReady?.();
        gl.domElement.addEventListener(
          "webglcontextlost",
          (e) => {
            e.preventDefault();
            onLost?.();
          },
          { once: true }
        );
      }}
    >
      <Suspense fallback={null}>
        <Portrait />
      </Suspense>
      <Sparkles count={36} scale={[7, 9, 4]} size={2.2} speed={0.25} opacity={0.5} color="#ff2e12" />
      <Sparkles count={28} scale={[8, 10, 5]} size={1.4} speed={0.18} opacity={0.4} color="#f4f0e6" />
    </Canvas>
  );
}
