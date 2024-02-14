export type TResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      error: TResponseError;
    };

type TResponseError =
  | {
      key: "VALIDATION_ERROR";
      fields: {
        [key: string]: unknown;
      };
    }
  | {
      key: "MUTATION_ERROR";
      message: string;
    }
  | {
      key: "SELECT_ERROR";
      message: string;
    };
