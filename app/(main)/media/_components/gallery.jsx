import React from "react";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

import { Loader2 } from "lucide-react";

const MediaGallery = ({ images, selectedImage, setImage, reading }) => {
  return (
    <Card>
      <CardContent className="p-4 ">
        {reading ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : images.length == 0 ? (
          <p className="text-muted-foreground text-center">
            No Images Available
          </p>
        ) : (
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((v, i) => (
              <Image
                key={i}
                src={v.src}
                width={200}
                height={200}
                alt="IMG"
                className={`w-full h-full object-contain aspect-square border rounded-md hover:border-neutral-500 hover:border-2  duration-300 transition-color ${
                  selectedImage?.id == v.id &&
                  "border-2 border-neutral-600 hover:border-neutral-600"
                }
                    `}
                onClick={() => setImage(v)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaGallery;
