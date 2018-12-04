import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AplicacaoSharedModule } from 'app/shared';
import {
    ResultsComponent,
    ResultsDetailComponent,
    ResultsUpdateComponent,
    ResultsDeletePopupComponent,
    ResultsDeleteDialogComponent,
    resultsRoute,
    resultsPopupRoute
} from './';

const ENTITY_STATES = [...resultsRoute, ...resultsPopupRoute];

@NgModule({
    imports: [AplicacaoSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ResultsComponent,
        ResultsDetailComponent,
        ResultsUpdateComponent,
        ResultsDeleteDialogComponent,
        ResultsDeletePopupComponent
    ],
    entryComponents: [ResultsComponent, ResultsUpdateComponent, ResultsDeleteDialogComponent, ResultsDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AplicacaoResultsModule {}
