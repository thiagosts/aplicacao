/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AplicacaoTestModule } from '../../../test.module';
import { PlacesDeleteDialogComponent } from 'app/entities/places/places-delete-dialog.component';
import { PlacesService } from 'app/entities/places/places.service';

describe('Component Tests', () => {
    describe('Places Management Delete Component', () => {
        let comp: PlacesDeleteDialogComponent;
        let fixture: ComponentFixture<PlacesDeleteDialogComponent>;
        let service: PlacesService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AplicacaoTestModule],
                declarations: [PlacesDeleteDialogComponent]
            })
                .overrideTemplate(PlacesDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PlacesDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlacesService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
