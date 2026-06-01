"use client";

import { useMemo, useRef } from "react";
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

    // gentle ambient breathing waves
    float wave =
      sin(pos.x * 3.0 + uTime * 0.7) * 0.025 +
      cos(pos.y * 4.0 + uTime * 0.5) * 0.025;
    pos.z += wave;

    // pointer pushes the surface outward
    float d = distance(uv, uMouse * 0.5 + 0.5);
    pos.z += smoothstep(0.45, 0.0, d) * 0.18 * uHover;

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

    // chromatic aberration, stronger on hover and toward edges
    float amt = 0.0025 + uHover * 0.006 + length(dir) * 0.004;
    float r = texture2D(uTex, uv - dir * amt).r;
    vec4  g = texture2D(uTex, uv);
    float b = texture2D(uTex, uv + dir * amt).b;
    vec3 col = vec3(r, g.g, b);

    // crush shadows toward warm ink for a duotone feel
    col = mix(vec3(0.043, 0.043, 0.051), col, smoothstep(0.0, 0.55, (col.r + col.g + col.b) / 3.0) * 0.35 + 0.65);

    // film grain
    float grain = fract(sin(dot(uv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
    col += (grain - 0.5) * 0.05;

    // soft vignette
    float vig = smoothstep(1.0, 0.25, length(dir));
    col *= mix(0.78, 1.0, vig);

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

  useFrame((state, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.elapsedTime;

    // pointer in normalized [-1,1]
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    m.uniforms.uMouse.value.lerp(mouse.current, 0.06);

    const targetHover = 1; // always slightly alive
    hover.current += (targetHover - hover.current) * 0.05;
    m.uniforms.uHover.value = hover.current;

    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        state.pointer.x * 0.12,
        0.05
      );
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        -state.pointer.y * 0.12,
        0.05
      );
    }
  });

  // fit a square plane responsively within the viewport
  const size = Math.min(viewport.width * 0.62, viewport.height * 0.82, 5.2);

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[size, size, 48, 48]} />
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

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Portrait />
      <Sparkles
        count={50}
        scale={[10, 8, 4]}
        size={2.4}
        speed={0.3}
        opacity={0.5}
        color="#ff2e12"
      />
      <Sparkles
        count={40}
        scale={[12, 9, 5]}
        size={1.6}
        speed={0.2}
        opacity={0.4}
        color="#f4f0e6"
      />
    </Canvas>
  );
}
