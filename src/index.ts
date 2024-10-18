export type InputOptions =
  | { inputType: "code"; value: string | number }
  | { inputType: "message"; value: string };

// --------------------------------------------------
const httpStatusCodes: { [x: string]: string } = {
  "100": "Continue",
  "101": "Switching Protocols",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": "Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Found",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a Teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "509": "Bandwidth Limit Exceeded",
  "510": "Not Extended",
  "511": "Network Authentication Required",
};

/**
 *
 */
class Status {
  private static messages: {
    [x: string]: string;
  } = httpStatusCodes;
  static redirect = {
    300: true,
    301: true,
    302: true,
    303: true,
    305: true,
    307: true,
    308: true,
  };
  static empty = {
    204: true,
    205: true,
    304: true,
  };
  static retry = {
    502: true,
    503: true,
    504: true,
  };
  private _code: string | number = "";
  private _message: string = "";
  constructor({ inputType, value }: InputOptions) {
    if (inputType === "code") {
      this._code = String(value);
    } else if (inputType === "message") {
      this._message = value;
    }
  }
  private codes(): number[] {
    return Object.keys(Status.messages).map((i) => Number(i));
  }

  private get_code() {
    if (this._message === "")
      throw new Error("Http status message required to get status code");
    const msg = this._message.toLowerCase();
    const key = Object.keys(Status.messages).find(
      (key) => Status.messages[key].toLowerCase() === msg
    );
    return key ? Number(key) : "";
  }
  private get_message() {
    if (this._code === "")
      throw new Error("Http status code required to get status message");
    return Status.messages[this._code]?.toLowerCase() ?? "";
  }
  /**
   * Retrieves all HTTP status codes as an array of numbers.
   *
   * @return {number[]} An array containing all the HTTP status codes.
   */
  public get allCodesNumber(): number[] {
    return this.codes();
  }
  /**
   * The HTTP status code.
   *
   * @return {number} The HTTP status code.
   */
  public get code(): number | "" {
    return this.get_code();
  }
  /**
   * The HTTP status message.
   *
   * @return {string} The HTTP status message.
   */
  public get message(): string {
    return this.get_message();
  }
  /**
   * Sets the HTTP status code.
   *
   * @param {string | number} code The HTTP status code.
   *                                Resets the status message when setting the code.
   */
  public set code(code: string | number) {
    this._message = "";
    this._code = String(code);
  }
  /**
   * Sets the HTTP status message.
   *
   * @param {string} message The HTTP status message.
   *                         Resets the status code when setting the message.
   */
  public set message(message: string) {
    this._code = "";
    this._message = message;
  }
}

export default Status;
