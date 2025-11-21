import { setGlobalConfig } from "basehub";

const SKIP_REMOTE_DATA = process.env.SKIP_REMOTE_DATA === "1";

const basehubToken = process.env.BASEHUB_TOKEN;

setGlobalConfig(
  SKIP_REMOTE_DATA || !basehubToken
    ? {}
    : {
        token: basehubToken,
      },
);
