"use client";

import { Copy, Upload, Trash, Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useEffect, useState } from "react";

import MediaGallery from "@/app/(main)/media/_components/gallery";
import MediaDetails from "@/app/(main)/media/_components/details";

import useMedia from "@/hooks/useMedia";

const MediaPage = () => {
  const {
    images,
    readImages,
    reading,
    createImages,
    creating,
    deleteImage,
    deleting,
  } = useMedia();
  const { toast } = useToast();
  useEffect(() => {
    if (images.length != 0) setImage(images[0]);
  }, []);

  useEffect(()=>{
    readImages()
  },[])

  const [selectedImage, setImage] = useState({});

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Media
      </h1>

      <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col gap-2">
          <div className="flex items-center">
            <Button disabled={creating} asChild size="sm" className="gap-1">
              <Label htmlFor="file">
                {creating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please Wait
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Upload
                    </span>
                  </>
                )}
              </Label>
            </Button>
            <Input
              className="hidden"
              id="file"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => createImages(e.target.files)}
            />
          </div>
          <MediaGallery
            reading={reading}
            images={images}
            selectedImage={selectedImage}
            setImage={setImage}
          />
        </div>

        {/* INFO CARD */}
        <div className="flex flex-col gap-2">
          <div className="flex md:justify-end items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="gap-1"
              onClick={() => {
                toast({
                  description: "Copied to Clipboard",
                });
                navigator.clipboard.writeText(selectedImage.src);
              }}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only lg:not-sr-only lg:whitespace-nowrap">
                Copy
              </span>
            </Button>
            <Button size="sm" className="gap-1">
              <Download className="h-3.5 w-3.5" />
              <span className="sr-only lg:not-sr-only lg:whitespace-nowrap">
                Download
              </span>
            </Button>
            <Button
              disabled={deleting}
              size="sm"
              variant="destructive"
              className="gap-1"
              onClick={() => deleteImage(selectedImage.id)}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  <Trash className="h-3.5 w-3.5" />
                  <span className="sr-only lg:not-sr-only lg:whitespace-nowrap">
                    Trash
                  </span>
                </>
              )}
            </Button>
          </div>
          <MediaDetails selectedImage={selectedImage} />
        </div>
      </div>
    </main>
  );
};

export default MediaPage;
