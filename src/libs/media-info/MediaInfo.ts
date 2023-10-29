import { BrowserFileReader } from "@/libs/media-info/BrowserFileReader";
import { ID3Tag, parse } from "@/libs/media-info/reader/id3Tag";

/**
 * Parses ID3 tags from a File instance
 * @param {File} file File to parse
 * @return {Promise<ID3Tag>}
 */
export const fromFile = async (file: File): Promise<Partial<ID3Tag>> => {
  const reader = new BrowserFileReader(file);

  await reader.open();
  const tags = await parse(reader);
  await reader.close();

  return tags;
};
