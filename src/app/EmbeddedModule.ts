import {Compiler, NgModuleFactory, SystemJsNgModuleLoader} from "@angular/core";

export class EmbeddedModule extends SystemJsNgModuleLoader {

  load(path: string): Promise<NgModuleFactory<any>> {

    return new EmbeddedModule({"compiler": "compiler.ts"} as any, "social-config.ts" as any).load("");
  }

}
