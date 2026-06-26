"use client";

import { Fraunces } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const fraunces = Fraunces({ subsets: ["latin"], weight: "600" });

const dishes = [
  {
    id: "demo-dish-1",
    name: "Vada Pav",
    price: "₹40",
    isVeg: true,
    description: "Spiced potato fritter in a soft bun, served with chutney.",
    modelUrl: "/models/vada-pav.glb",
  },
  {
    id: "demo-dish-2",
    name: "Curry with Rice",
    price: "₹120",
    isVeg: true,
    description: "Panner and mix vegetable curry, served with steamed rice.",
    modelUrl: "/models/curry.glb",
  },
  {
    id: "demo-dish-3",
    name: "Chocolate Brownie with Vanilla Ice Cream",
    price: "₹150",
    isVeg: true,
    description: "Warm fudge brownie topped with a scoop of vanilla ice cream and chocolate drizzle.",
    modelUrl: "/models/dessert.glb",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInAR, setIsInAR] = useState(false);
  const modelViewerRef = useRef(null);
  const currentDish = dishes[currentIndex];

  useEffect(() => {
    import("@google/model-viewer");
  }, []);

  useEffect(() => {
    if (modelViewerRef.current) {
      modelViewerRef.current.src = currentDish.modelUrl;
    }
  }, [currentDish.modelUrl]);

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    if (!modelViewer) {
      return;
    }

    const handleARStatus = (event) => {
      setIsInAR(event.detail.status === "session-started");
    };

    modelViewer.addEventListener("ar-status", handleARStatus);

    return () => {
      modelViewer.removeEventListener("ar-status", handleARStatus);
    };
  }, []);

  const showPreviousDish = () => {
    setCurrentIndex((index) => (index === 0 ? dishes.length - 1 : index - 1));
  };

  const showNextDish = () => {
    setCurrentIndex((index) => (index === dishes.length - 1 ? 0 : index + 1));
  };

  return (
    <main className="page">
      <section className="viewerFrame">
        {!isInAR && (
          <div className="topBanner">
            <h1 className={`${fraunces.className} dishName`}>{currentDish.name}</h1>
            <span className={`badge ${currentDish.isVeg ? "badgeVeg" : "badgeNonVeg"}`}>
              <span className="badgeDot" />
              {currentDish.isVeg ? "Veg" : "Non-Veg"}
            </span>
          </div>
        )}

        <div className="modelStage">
          <model-viewer
            ref={modelViewerRef}
            alt="A 3D model preview for the selected dish"
            camera-controls
            ar
            className="modelViewer"
          />
        </div>

        {!isInAR && (
          <div className="bottomBar">
            <button type="button" onClick={showPreviousDish} className="button">
              Prev
            </button>
            <div className="details">
              <strong className="price">{currentDish.price}</strong>
              <p className="description">{currentDish.description}</p>
            </div>
            <button type="button" onClick={showNextDish} className="button">
              Next
            </button>
          </div>
        )}
      </section>

      <style jsx>{`
        .page {
          min-height: 100vh;
          margin: 0;
          background: #fffaf4;
          color: #1a1614;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .viewerFrame {
          display: flex;
          flex-direction: column;
          min-height: 100svh;
          width: 100%;
          background: #fffaf4;
        }

        .topBanner,
        .bottomBar {
          background: #fff8f0;
          color: #1a1614;
          flex-shrink: 0;
          padding: 18px 20px;
          box-shadow: 0 1px 0 rgba(26, 22, 20, 0.08);
        }

        .topBanner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          min-height: 74px;
        }

        .dishName {
          margin: 0;
          color: #1a1614;
          font-size: 30px;
          font-weight: 600;
          line-height: 1.08;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          border-radius: 999px;
          color: #ffffff;
          flex-shrink: 0;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          padding: 8px 11px;
          white-space: nowrap;
        }

        .badgeVeg {
          background: #3f7d58;
        }

        .badgeNonVeg {
          background: #b23a2e;
        }

        .badgeDot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #ffffff;
        }

        .modelStage {
          display: flex;
          flex: 1;
          min-height: 430px;
          background: #ffffff;
        }

        .modelViewer {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 430px;
        }

        .bottomBar {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          box-shadow: 0 -1px 0 rgba(26, 22, 20, 0.08);
        }

        .details {
          min-width: 0;
          text-align: left;
        }

        .price {
          display: block;
          color: #d9540a;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 5px;
        }

        .description {
          margin: 0;
          color: #655a52;
          font-size: 14px;
          line-height: 1.4;
        }

        .button {
          appearance: none;
          border: 0;
          border-radius: 999px;
          background: #d9540a;
          color: #ffffff;
          cursor: pointer;
          font: 700 14px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          min-width: 72px;
          padding: 12px 17px;
        }

        .button:hover {
          background: #b94408;
        }

        @media (max-width: 520px) {
          .topBanner,
          .bottomBar {
            padding: 16px;
          }

          .dishName {
            font-size: 28px;
          }

          .modelStage,
          .modelViewer {
            min-height: calc(100svh - 196px);
          }

          .bottomBar {
            grid-template-columns: 1fr 1fr;
          }

          .details {
            grid-column: 1 / -1;
            grid-row: 1;
          }

          .button {
            grid-row: 2;
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}


