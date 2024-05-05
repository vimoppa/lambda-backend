import { successResponse } from '../libs/response';
import { Response } from '../libs/response/types';
import wrap from '../libs/wrap';

const handler = async (): Promise<Response> => {
  const paths = [
    // {
    //   path: "/v1/store/create",
    //   method: "POST",
    //   example: "/v1/store/create",
    // },
  ] as { path: string; method: string; example: string }[];

  return successResponse({
    message: "This endpoint doesn't exist, check `paths` for a list of all endpoints.",
    paths,
  });
};

export default wrap(handler);
