import { Effects, useGLTF, Html, useProgress } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { easing } from "maath";
import Lights from "./Lights";
import AsciiRenderer from "./AsciiRenderer";
import { Group } from "three";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Face = () => {
  const ref = useRef<Group>(null);
  const { scene, nodes } = useGLTF("/face.glb");
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    //@ts-ignore
    easing.dampE(
      ref.current.rotation,
      [-pointer.y * (Math.PI / 10), pointer.x * (Math.PI / 10), 0],
      0.5,
      delta
    );
  });
  return (
    <Suspense fallback={<Loader />}>
      <group ref={ref} scale={0.28}>
        <primitive object={scene} />
      </group>
      <AsciiRenderer fgColor="#ffe4c3" />
    </Suspense>
  );
};

const FaceScene = () => {
  return (
    <Canvas>
      <Face />
      <Lights />
    </Canvas>
  );
};

export default FaceScene;
