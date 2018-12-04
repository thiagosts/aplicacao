/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AplicacaoTestModule } from '../../../test.module';
import { CustomizationDeleteDialogComponent } from 'app/entities/customization/customization-delete-dialog.component';
import { CustomizationService } from 'app/entities/customization/customization.service';

describe('Component Tests', () => {
    describe('Customization Management Delete Component', () => {
        let comp: CustomizationDeleteDialogComponent;
        let fixture: ComponentFixture<CustomizationDeleteDialogComponent>;
        let service: CustomizationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [AplicacaoTestModule],
                declarations: [CustomizationDeleteDialogComponent]
            })
                .overrideTemplate(CustomizationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomizationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomizationService);
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
