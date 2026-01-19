import Image from "next/image";

export default function PokemonCard() {
    return(
        <>
            <div className="hover-3d">
  {/* content */}
  <figure className="w-60 rounded-2xl">
    <Image src="https://img.daisyui.com/images/stock/card-1.webp?x" alt="Tailwind CSS 3D card" width={240} height={320} />
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
    <Image src="https://img.daisyui.com/images/stock/card-2.webp?x" alt="Tailwind CSS 3D hover" width={240} height={320} />
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
    <Image src="https://img.daisyui.com/images/stock/card-3.webp?x" alt="Tailwind CSS 3D hover" width={240} height={320} />
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
        </>
    )
}