import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes angular material
import {
  MatProgressBarModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ElectronService } from './share/services/electron.service';
import { WebviewDirective } from './share/directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TopBarFrameComponent } from './share/components/top-bar-frame/top-bar-frame.component';
import { BottonBarStatusComponent } from './share/components/botton-bar-status/botton-bar-status.component';
import { ResourcesTreeComponent } from './share/components/resources-tree/resources-tree.component';
import { CONSTS } from './share/services/consts/consts.service';
import { PropertiesEditorComponent } from './share/components/properties-editor/properties-editor.component';
import { Emissor } from './share/services/emissor-eventos/emissor-eventos.service';
import { DatabaseStorageService } from './share/services/database-storage/database-storage.service';
import { UtilsService } from './share/services/utils/utils.service';
import { PaginaInicialComponent } from './pages/pagina-inicial/pagina-inicial.component';
import { LoadingModalComponent } from './share/components/loading-modal/loading-modal.component';
import { CurrentStatusComponent } from './share/components/current-status/current-status.component';
import { InputLabelTypeComponent } from './share/components/input-label-type/input-label-type.component';
import { ToolBarComponent } from './share/components/tool-bar/tool-bar.component';
import { TerminalAccessService } from './share/services/terminal-access/terminal-access.service';
import { CodeEditorComponent } from './share/components/code-editor/code-editor.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    TopBarFrameComponent,
    BottonBarStatusComponent,
    ResourcesTreeComponent,
    PropertiesEditorComponent,
    PaginaInicialComponent,
    LoadingModalComponent,
    CurrentStatusComponent,
    InputLabelTypeComponent,
    ToolBarComponent,
    CodeEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Componentes angular material
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,

    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [ElectronService, CONSTS, Emissor, DatabaseStorageService, UtilsService, TerminalAccessService],
  bootstrap: [AppComponent, /* LoadingModalComponent */]
})
export class AppModule { }
