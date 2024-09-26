"use client";
import React, { useRef } from "react";
import { motion, MotionCanvas } from "framer-motion-3d";
import { useFrame, extend } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { MotionConfig } from "framer-motion";

extend({
  BoxGeometry: THREE.BoxGeometry,
  Mesh: THREE.Mesh,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  DirectionalLight: THREE.DirectionalLight,
  AmbientLight: THREE.AmbientLight,
  PointLight: THREE.PointLight,
});

const CubeMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.abs(Math.sin(time * 2)) * 2; 
      meshRef.current.rotation.x = time;
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <motion.mesh
      ref={meshRef}
      initial={{ x: -5, scale: 1, y: 10 }}
      animate={{ x: 5, y: 0, scale: 1.5 }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,       
        repeatType: "reverse", 
      }}
    >
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color="#FFFFFF"  />
      </Box>
    </motion.mesh>
  );
};

const ThreejsCube: React.FC = () => {
  return (
    <MotionConfig transition={{ type: "spring" }}>
      <motion.div 
        animate={{ scale: 1 }} 
        className="absolute top-0 left-0 w-screen h-screen -z-0 overflow-hidden"
      >
        <MotionCanvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[2, 5, 5]} intensity={0.8} castShadow />
          
          <CubeMesh />
        </MotionCanvas>
      </motion.div>
    </MotionConfig>
  );
};

export default ThreejsCube;
