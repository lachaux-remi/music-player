import { Reader } from "@/libs/media-info/reader/Reader";
import { ImageValue, parse as parseFrame } from "@/libs/media-info/reader/id3Frame";
import { getString, getUint24, getUint32Synch } from "@/libs/media-info/reader/util";

export interface ID3Tag {
  title: string | null;
  album: string | null;
  artist: string | null;
  image: ImageValue | null;
}

export async function parse(handle: Reader): Promise<Partial<ID3Tag>> {
  const onlyInfos = ["title", "album", "artist", "image"];
  let tag: Partial<ID3Tag> = {};

  const v2PrefixBuf = await handle.read(14, 0);
  const v2Prefix = new DataView(v2PrefixBuf);

  if (v2PrefixBuf.byteLength === 14 && getString(v2Prefix, 3, undefined, true) === "ID3" && v2Prefix.getUint8(3) <= 4) {
    let headerSize = 10;
    let tagSize = 0;
    const version = [v2Prefix.getUint8(3), v2Prefix.getUint8(4)];
    const tagFlags = v2Prefix.getUint8(5);

    if ((tagFlags & 0x80) === 0) {
      if ((tagFlags & 0x40) !== 0) {
        headerSize += getUint32Synch(v2Prefix, 11);
      }

      tagSize += getUint32Synch(v2Prefix, 6);

      const v2TagBuf = await handle.read(tagSize, headerSize);
      const v2Tag = new DataView(v2TagBuf);
      let position = 0;

      while (position < v2TagBuf.byteLength) {
        let slice;
        let isFrame = true;

        for (let i = 0; i < 3; i++) {
          const frameBit = v2Tag.getUint8(position + i);

          if ((frameBit < 0x41 || frameBit > 0x5a) && (frameBit < 0x30 || frameBit > 0x39)) {
            isFrame = false;
          }
        }

        if (!isFrame) {
          break;
        }

        if (version[0] < 3) {
          slice = v2TagBuf.slice(position, position + 6 + getUint24(v2Tag, position + 3));
        } else if (version[0] === 3) {
          slice = v2TagBuf.slice(position, position + 10 + v2Tag.getUint32(position + 4));
        } else {
          slice = v2TagBuf.slice(position, position + 10 + getUint32Synch(v2Tag, position + 4));
        }

        const frame = parseFrame(slice, version[0]);

        if (frame && frame.tag && onlyInfos.includes(frame.tag)) {
          if (frame.tag === "image") {
            if (!tag.image) {
              tag = { ...tag, image: frame.value as ImageValue };
            }
          } else {
            tag = { ...tag, [frame.tag]: frame.value };
          }
        }
        position += slice.byteLength;
      }
    }
  }

  return tag;
}
