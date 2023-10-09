export abstract class Reader {
  /**
   * Size of the resource
   */
  public size: number = 0;

  /**
   * Opens the resource for reading
   * @return {Promise<void>}
   */
  public abstract open(): Promise<void>;

  /**
   * Closes the resource
   * @return {Promise<void>}
   */
  public async close(): Promise<void> {
    return;
  }

  /**
   * Reads a specified range of the resource
   * @param {number} length Number of bytes to read
   * @param {number} position Position to begin from
   * @return {Promise<ArrayBuffer>}
   */
  public abstract read(length: number, position: number): Promise<ArrayBuffer>;
}
