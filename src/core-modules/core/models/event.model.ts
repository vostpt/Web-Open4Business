/**
 * The EventModel class.
 * Represents the definition of the standard approach to a fired event.
 */
export class EventModel {
  /**
   * The event type.
   */
  type: string;
  /**
   * The event payload.
   */
  data: any;

  /**
   *
   * EventModel contructor.
   *
   * @param type The event type
   * @param data The event payload
   */
  constructor(type: string, data: any) {
    this.type = type;
    this.data = data;
  }
}
