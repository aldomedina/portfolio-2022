import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { AsciiEffect } from "three-stdlib";

export default function AsciiRenderer({
  renderIndex = 1,

  fgColor = "#ffe4c3",
  characters = " .,:;|iI+hHOE#XS",
  invert = false,
  color = false,
  resolution = 0.18,
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution,
    });
    effect.domElement.style.color = fgColor;
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, invert, color, resolution, gl, fgColor]);

  // Append on mount, remove on unmount
  useEffect(() => {
    if (!gl.domElement.style || !gl.domElement.parentNode) return;
    gl.domElement.style.opacity = "0";
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      if (!gl.domElement.parentNode) return;
      gl.domElement.parentNode.removeChild(effect.domElement);
    };
  }, [effect, gl]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame(({ mouse }) => {
    effect.render(scene, camera);
  }, renderIndex);

  // This component returns nothing, it is a purely logical
  return null;
}
