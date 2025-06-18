import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import { Book } from "./Book";
import { BookUI } from "./UI";
import { Provider } from "jotai";

export const BookScene = () => {
  return (
    <Provider>
      <div className="w-full h-screen">
        <Canvas>
          <color attach="background" args={["#ececec"]} />
          <PerspectiveCamera makeDefault position={[0, 0, 4]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 0]} intensity={0.8} />
          <Environment preset="city" />

          <Float
            speed={2}
            rotationIntensity={0.6}
            floatIntensity={0.6}
            floatingRange={[0, 0.5]}
          >
            <Book />
          </Float>
        </Canvas>
        <BookUI />
      </div>
    </Provider>
  );
}; 