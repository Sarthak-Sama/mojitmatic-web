function Strip({
  text,
  direction = "left",
}: {
  text: string;
  direction?: string;
}) {
  const isLeft = direction === "left";

  return (
    <div>
      <style>
        {`
          .marquee-container {
            background-color: #fff;
            overflow: hidden;
            position: relative;
            height: 2rem;
            width: 100%;
          }
          .marquee-wrapper-left {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-left 20s linear infinite;
          }
          .marquee-wrapper-right {
            display: inline-block;
            white-space: nowrap;
            animation: scroll-right 20s linear infinite;
          }
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-20%);
            }
          }
          @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(20%);
            }
          }
        `}
      </style>

      <div className="marquee-container">
        <div
          className={`translate-y-[12.5%] ${
            isLeft ? "marquee-wrapper-left" : "marquee-wrapper-right"
          }`}
        >
          <span>
            {[...Array(10)].map(() => `${text.toUpperCase()} • `).join("")}
          </span>
          <span>
            {[...Array(10)].map(() => `${text.toUpperCase()} • `).join("")}
          </span>
          <span>
            {[...Array(10)].map(() => `${text.toUpperCase()} • `).join("")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Strip;
