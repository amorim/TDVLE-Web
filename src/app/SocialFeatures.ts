import {ForumModule} from "./ForumModule";
import {EmbeddedModule} from "./EmbeddedModule";

export class SocialFeatures {

    // @ts-ignore
  public enableFeatures(forumModule: ForumModule) {
    window['dynamicLoader'].load(forumModule);
  }

    // @ts-ignore
  public enableFeatures(forumModule: ForumModule, embeddedSocialNetworkModel: EmbeddedModule) {
    window['dynamicLoader'].load(forumModule, embeddedSocialNetworkModel);
  }
}
