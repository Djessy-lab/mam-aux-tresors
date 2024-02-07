import Image from "next/image"

function Logo() {
  return (
    <div>
      <Image
        src="/img/Logo.png"
        width={1920}
        height={1080}
        alt="logo"
        priority={true}
        className="mb-10"
        />
    </div>
  )
}

export default Logo
