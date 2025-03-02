import Image from 'next/image';

export default function Logo() {

    return (
        <Image
            width={48}
            height={48}
            alt="Logo Join"
            src="/logo-join.png"
        />
    )
}