import Image, { ImageProps } from "next/image";

type Props = ImageProps;

export default function MediaContainer(props: ImageProps) {
    const { className, ...anotherProps } = props;
    return (
        <div className="flex justify-center">
            {/* Note: props.alt is required, so we silent this warning */}
            {/* */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image className={`${className} rounded-md`} {...anotherProps} />
        </div>
    );
}
