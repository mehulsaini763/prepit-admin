import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import PlaceholderImage from "@/assets/placeholder.svg";

const MediaDetails = ({ selectedImage }) => {
  return (
    <Card className="grid grid-cols-3 md:grid-cols-1">
      <CardHeader className="bg-muted/50 p-0">
        <Image
          className="h-full w-full"
          src={selectedImage?.src || PlaceholderImage.src}
          width={1000}
          height={1000}
          alt="IMAGE"
        />
      </CardHeader>
      <CardContent className="p-6 text-sm col-span-2 md:col-span-1">
        <div className="grid gap-3">
          <div className="font-semibold">Details</div>
          <ul className="grid gap-3">
            <li className="grid grid-cols-2">
              <span className="text-muted-foreground">Name</span>
              <span className="text-right truncate">
                {selectedImage?.name || "--"}
              </span>
            </li>
            <li className="grid grid-cols-2">
              <span className="text-muted-foreground">Url</span>
              <span className="text-right truncate">
                {selectedImage?.src || "--"}
              </span>
            </li>
            <li className="grid grid-cols-2">
              <span className="text-muted-foreground">Height</span>
              <span className="text-right">
                {selectedImage?.height || "--"}
              </span>
            </li>
            <li className="grid grid-cols-2">
              <span className="text-muted-foreground">Width</span>
              <span className="text-right">{selectedImage?.width || "--"}</span>
            </li>
            <li className="grid grid-cols-2">
              <span className="text-muted-foreground">Size</span>
              <span className="text-right">
                {selectedImage?.size
                  ? Math.round(selectedImage.size / 1000) + "kb"
                  : "--"}
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaDetails;
