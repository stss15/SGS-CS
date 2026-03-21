export const isIgcseLegacySlideRoute = (routePath: string): boolean =>
  /(?:^|\/)(?:\d+\.\d+_[^/]+|slides\/)/i.test(routePath);

export const isIgcseWorkspaceRoute = (routePath: string): boolean =>
  isIgcseLegacySlideRoute(routePath) ||
  /(assessment|flashcards|game|activity|quiz|sql|simulator|simulation|sim|project|worksheet|playground|ide|quest|visualis[ae]r|negative|number_representation|text_sound_images|data_storage_compression)/i.test(
    routePath
  );

export const isKs3WorkspaceRoute = (routePath: string): boolean =>
  /(activity|quiz|game|slide|simulator|simulation|playground|project|worksheet|tool|assessment|mission-control|planet-x|\/l\d)/i.test(
    routePath
  );
