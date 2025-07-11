import { Client } from "@replit/object-storage";
import { Buffer } from "buffer";
import { Suspense } from "react";

const client = new Client({
  bucketId: "your-bucket-id",
});

export default async function Home() {
  const photosRes = await getPhotos();

  return (
    <main className="flex flex-col min-h-screen gap-3 p-3 font-sans">
      <h1 className="font-semibold text-center text-lg">My Photo Gallery</h1>
      <div className="grid gap-3 place-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        <Suspense fallback={<LoadingGrid count={photosRes.length} />}>
          <Photos photosRes={photosRes} />
        </Suspense>
      </div>
    </main>
  );
}

/**
 * Renders a collection of photos.
 *
 * First, a static list of photos stored as assets in the /public folder
 * are rendered. Then, if there any photo assets stored in object storage,
 * they are rendered after the static assets.
 */
async function Photos({ photosRes }: { photosRes: string[] }) {
  try {
    const photos = await Promise.all(
      photosRes.map(async (name) => {
        const photo = await getPhotoAsBytes(name);
        return { name, photo };
      }),
    );

    const staticAssetImages = [1, 2, 3].map((i) => `/images/photo-${i}.jpg`);

    return (
      <>
        {staticAssetImages.map((src, i) => (
          <Photo key={`photo-${i}`} name={`photo-${i}`} src={src} />
        ))}
        {photos.map(({ name, photo }, index) => (
          <Photo key={index} name={name} photo={photo} />
        ))}
      </>
    );
  } catch (error) {
    console.error("Error loading photos:", error);
    return <div className="text-center">Failed to load photos.</div>;
  }
}

/**
 * Renders a single photo element.
 */
function Photo({
  name,
  photo,
  src,
}: {
  name: string;
  photo?: Buffer[] | null;
  src?: string;
}) {
  if (!photo && !src) {
    return null;
  }

  return (
    <div className="rounded overflow-hidden aspect-square bg-neutral-200">
      <img
        className="h-full w-full object-cover animate-appear"
        src={
          photo != null ? `data:image/jpeg;base64,${photoToBase64(photo)}` : src
        }
        alt={"Gallery image: " + name}
      />
    </div>
  );
}

// Data fetching and conversion

async function getPhotos() {
  // wrap this in try/catch since client.list() will fail until we have a
  // bucketId specified in Client initialization
  try {
    const { ok, value, error } = await client.list();

    if (!ok) {
      console.error("Failed to list photos", error);
      return [];
    }

    return value.map((photo) => photo.name);
  } catch (e) {
    console.error("Failed to list photos", e);
    return [];
  }
}

async function getPhotoAsBytes(photo: string) {
  const { ok, value, error } = await client.downloadAsBytes(photo);
  if (!ok) {
    console.error("Failed to download photo", error);
    return null;
  }

  return value;
}

function photoToBase64(photo: Buffer[]) {
  return Buffer.from(photo[0]).toString("base64");
}

// Loading components

function LoadingGrid({ count }: { count: number }) {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <LoadingSquare key={i} />
        ))}
    </>
  );
}

function LoadingSquare() {
  return <div className="rounded aspect-square bg-neutral-200 animate-pulse" />;
}
