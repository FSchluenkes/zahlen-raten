"use client";
import React, { useRef } from "react";
import { motion, MotionCanvas } from "framer-motion-3d";
import { useFrame, extend } from "@react-three/fiber";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { MotionConfig } from "framer-motion";

// Extend geometries and materials
extend({
  BoxGeometry: THREE.BoxGeometry,
  Mesh: THREE.Mesh,
  MeshStandardMaterial: THREE.MeshStandardMaterial,
  DirectionalLight : THREE.DirectionalLight
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
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color="#8844aa" />
      </Box>
    </motion.mesh>
  );
};

const ThreejsCube: React.FC = () => {
  return (
    <MotionConfig transition={{ type: "spring" }}>
      <motion.div animate={{ scale: 1 }}>
        <MotionCanvas camera={{ position: [0, 0, 5] }}>
          {/* Ambient light for general brightness */}
          <ambientLight intensity={0.5} />

          {/* Point light for dynamic lighting */}
          <pointLight position={[5, 5, 5]} intensity={1} />

          {/* Directional light for direct light and shadow casting */}
          <directionalLight
            position={[2, 5, 5]}
            intensity={0.8}
            castShadow
          />

          {/* The animated Cube Mesh */}
          <CubeMesh />
        </MotionCanvas>
      </motion.div>
    </MotionConfig>
  );
};

export default ThreejsCube;
