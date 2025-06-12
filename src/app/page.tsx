"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshWobbleMaterial,
  GradientTexture,
} from "@react-three/drei";


const CanvasMain = ({ children }: any) => {
  return (
    <Canvas>
      <ambientLight intensity={0.4} />

      <OrbitControls />
      <directionalLight color={"red"} position={[0, 0, 5]} />
      <pointLight position={[10, 10, 10]} />
      {children}
    </Canvas>
  );
};


const Cube = () => {
  const ref = useRef<any>(null);

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime) * 2;
    console.log("", state.clock.elapsedTime);
  });

  return (
    <mesh position={[-4, 1, -2]} ref={ref}>
      <boxGeometry args={[1, 2, 3]} />
      <meshStandardMaterial color={"hotpink"} />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh position={[1, 0, -2]}>
      <sphereGeometry args={[2, 100, 100]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};

const Torus = () => {
  const ref = useRef<any>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useFrame((state, delta) => {
    const speed = isHovered ? 0.1 : 0.02;
    ref.current.rotation.x += speed;
  });
  return (
    <mesh
      position={[-6, 1, -10]}
      ref={ref}
      onPointerEnter={(even) => (event?.stopPropagation(), setIsHovered(true))}
      onPointerLeave={(event) => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 2}
    >
      <torusGeometry args={[1, 0.2, 200]} />
      <meshStandardMaterial color={isHovered ? "red" : "lightblue"} />
    </mesh>
  );
};

const Wobble = () => {
  return (
    <mesh position={[1, 1, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <MeshWobbleMaterial
        factor={0.9}
        speed={4}
      >
        <GradientTexture
          attach="map"
          stops={[0, 1]}
          colors={['red', 'lightgreen']}
        />
      </MeshWobbleMaterial>
    </mesh>
  );
};

const Home = () => {
  return (
    <div className="h-screen w-screen">
      <h1>I am heading 1</h1>

      <CanvasMain>
        <Cube />
        <Sphere />
        <Torus />
        <Wobble />
      </CanvasMain>
    </div>
  );
};

export default Home;
