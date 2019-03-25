import {Compiler, NgModuleFactory, SystemJsNgModuleLoader} from "@angular/core";

export class ForumModule extends SystemJsNgModuleLoader {

  load(path: string): Promise<NgModuleFactory<any>> {
    return new ForumModule({"compiler": "compiler.ts"} as any, "forum-config.ts" as any).load("");
  }

}
