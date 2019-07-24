import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Components
import { MatCheckboxModule, MatButtonModule } from '@angular/material';

import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    ToolBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // Material components
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

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
export class AppModule {}
