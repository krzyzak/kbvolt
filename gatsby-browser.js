/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import * as loadScript from "simple-load-script";

// You can delete this file if you're not using it
export const onInitialClientRender = () => {
  loadScript('/js/jquery.js', { inBody: true })
  loadScript('/js/plugins.js', { inBody: true })
  loadScript('/js/functions.js', { inBody: true })
}
