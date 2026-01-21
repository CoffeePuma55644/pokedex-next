import Image from "next/image";

export default function PokemonCard() {
  return (
    <>
      <div className="hover-3d">
        {/* content */}
        <figure className="w-60 rounded-2xl">
          <Image
            src="/images/bulbizard.webp"
            alt="Tailwind CSS 3D card"
            width={240}
            height={320}
          />
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="hover-3d">
        {/* content */}
        <figure className="w-60 rounded-2xl">
          <Image
            src="/images/carapuce.webp"
            alt="Tailwind CSS 3D hover"
            width={240}
            height={320}
          />
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="hover-3d">
        <figure className="w-60 rounded-2xl">
          <Image
            src="/images/draco.webp"
            alt="Tailwind CSS 3D hover"
            width={240}
            height={320}
          />
        </figure>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
