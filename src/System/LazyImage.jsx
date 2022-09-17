import { clsx } from "clsx";
import React, { memo } from "react";

const LazyImage = memo(
  ({ anima: Anima, className, animaProps, src, classNameImageBlock }) => {
    if (Anima !== undefined) {
      return (
        <div
          className={clsx(
            "relative w-full flex justify-center items-center flex-1",
            classNameImageBlock
          )}
        >
          <Anima {...animaProps} />
        </div>
      );
    }

    return (
      <div
        className={clsx(
          "relative w-full flex justify-center items-center flex-1",
          classNameImageBlock
        )}
      >
        {src && (
          <img
            className={clsx("border-0 outline-0 object-cover", className)}
            alt=""
            src={src}
          />
        )}
      </div>
    );
  }
);

export default LazyImage;
