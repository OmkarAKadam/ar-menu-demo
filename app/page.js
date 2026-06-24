"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  return (
    <model-viewer
      src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
      alt="A 3D model of an astronaut"
      camera-controls
      ar
      style={{ width: "100%", height: "500px" }}
    />
  );
}
