const Lights = () => {
  return (
    <>
      <spotLight
        penumbra={1}
        angle={0.2}
        castShadow
        position={[10, 20, 0]}
        intensity={1}
      />
      <spotLight intensity={1} position={[-10, -20, 0]} />
    </>
  );
};

export default Lights;
