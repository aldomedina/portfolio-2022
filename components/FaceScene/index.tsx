import { Effects, useGLTF } from "@react-three/drei";
import { AsciiEffect } from "three-stdlib";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import Lights from "./Lights";
import AsciiRenderer from "./AsciiRenderer";
import { Group } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { easing } from "maath";

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
    <Suspense>
      <group ref={ref} scale={0.28}>
        <primitive object={scene} />
      </group>
    </Suspense>
  );
};

const FaceScene = () => {
  return (
    <Canvas>
      <Face />
      <Lights />
      <AsciiRenderer fgColor="#ffe4c3" />
    </Canvas>
  );
};

export default FaceScene;
